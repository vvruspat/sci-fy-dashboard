import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { latLngToVector3, makeGlowTexture, makeRingTexture, buildGraticule, buildContinents, buildArcPoints } from './sceneBuilders';
import styles from './Globe3D.module.css';

export type DatacenterStatus = 'online' | 'warning' | 'critical';
export type GlobeLinkStatus = 'active' | 'degraded';

export interface GlobeDatacenter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: DatacenterStatus;
}

export interface GlobeLink {
  id: string;
  from: string;
  to: string;
  status: GlobeLinkStatus;
}

interface Globe3DProps {
  datacenters: GlobeDatacenter[];
  links: GlobeLink[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  size?: number;
  /** OrbitControls autoRotateSpeed — roughly one full turn per (60 / speed) seconds. */
  autoRotateSpeed?: number;
  className?: string;
}

const RADIUS = 100;

const STATUS_COLOR: Record<DatacenterStatus, string> = {
  online: 'hsl(185, 100%, 43%)',
  warning: 'hsl(30, 80%, 69%)',
  critical: 'hsl(352, 100%, 62%)',
};

const LINK_COLOR: Record<GlobeLinkStatus, string> = {
  active: 'hsl(185, 100%, 55%)',
  degraded: 'hsl(30, 80%, 69%)',
};

/**
 * Rotating WebGL Earth (three.js) with glowing continent outlines pulled from a bundled
 * world atlas, datacenter markers, and elevated great-circle connection arcs. Auto-rotates
 * via OrbitControls when idle; drag to spin manually, click a marker to select it.
 */
export function Globe3D({
  datacenters,
  links,
  selectedId,
  onSelect,
  size = 280,
  autoRotateSpeed = 1.75,
  className,
}: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const ringByIdRef = useRef(new Map<string, THREE.Sprite>());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    // Wider FOV than a "natural" lens so the connection arcs (which bulge above the
    // sphere surface) stay comfortably inside the frustum instead of clipping at the edges.
    const camera = new THREE.PerspectiveCamera(56, 1, 1, 2000);
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(new THREE.Color('hsl(185, 60%, 25%)'), 1.2));
    const sun = new THREE.DirectionalLight(new THREE.Color('hsl(185, 60%, 85%)'), 1.5);
    sun.position.set(120, 90, 160);
    scene.add(sun);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 0.985, 64, 64),
      new THREE.MeshPhongMaterial({
        color: new THREE.Color('hsl(185, 70%, 5%)'),
        emissive: new THREE.Color('hsl(185, 60%, 3%)'),
        shininess: 12,
        transparent: true,
        opacity: 0.94,
      }),
    );
    scene.add(sphere);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.06, 48, 48),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('hsl(185, 100%, 55%)'),
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
      }),
    );
    scene.add(atmosphere);

    const graticule = buildGraticule(RADIUS, 'hsl(185, 74%, 22%)');
    scene.add(graticule);

    const continents = buildContinents(RADIUS * 1.001, 'hsl(185, 100%, 55%)');
    scene.add(continents);

    const glowTexture = makeGlowTexture();
    const ringTexture = makeRingTexture();
    ringByIdRef.current.clear();
    const clickableIds: string[] = [];
    const clickableObjects: THREE.Object3D[] = [];

    const markerGroup = new THREE.Group();
    for (const dc of datacenters) {
      const group = new THREE.Group();
      group.position.copy(latLngToVector3(dc.lat, dc.lng, RADIUS * 1.01));

      const color = new THREE.Color(STATUS_COLOR[dc.status]);

      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture, color, transparent: true, opacity: 0.55, depthWrite: false,
      }));
      glow.scale.setScalar(14);
      group.add(glow);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 16, 16),
        new THREE.MeshBasicMaterial({ color }),
      );
      group.add(dot);

      const ring = new THREE.Sprite(new THREE.SpriteMaterial({
        map: ringTexture, color, transparent: true, opacity: 0.9, depthWrite: false,
      }));
      ring.scale.setScalar(11);
      ring.visible = dc.id === selectedId;
      group.add(ring);

      markerGroup.add(group);
      ringByIdRef.current.set(dc.id, ring);
      clickableIds.push(dc.id);
      clickableObjects.push(dot);
    }
    scene.add(markerGroup);

    const datacenterById = new Map(datacenters.map((d) => [d.id, d]));
    const linkGroup = new THREE.Group();
    for (const link of links) {
      const from = datacenterById.get(link.from);
      const to = datacenterById.get(link.to);
      if (!from || !to) continue;
      const a = latLngToVector3(from.lat, from.lng, RADIUS);
      const b = latLngToVector3(to.lat, to.lng, RADIUS);
      const geometry = new THREE.BufferGeometry().setFromPoints(buildArcPoints(a, b, RADIUS));
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(LINK_COLOR[link.status]),
        transparent: true,
        opacity: 0.75,
      });
      linkGroup.add(new THREE.Line(geometry, material));
    }
    scene.add(linkGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.82;

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let pointerDownAt: { x: number; y: number } | null = null;

    function handlePointerDown(e: PointerEvent) {
      pointerDownAt = { x: e.clientX, y: e.clientY };
      container?.classList.add(styles.dragging);
    }
    function handlePointerUp(e: PointerEvent) {
      container?.classList.remove(styles.dragging);
      if (!pointerDownAt) return;
      const moved = Math.hypot(e.clientX - pointerDownAt.x, e.clientY - pointerDownAt.y);
      pointerDownAt = null;
      if (moved > 4) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hit = raycaster.intersectObjects(clickableObjects)[0];
      if (hit) {
        const index = clickableObjects.indexOf(hit.object);
        if (index !== -1) onSelectRef.current?.(clickableIds[index]);
      }
    }
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    function resize() {
      const w = container!.clientWidth || size;
      const h = container!.clientHeight || size;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let frameId = 0;
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      controls.dispose();
      renderer.dispose();
      glowTexture.dispose();
      ringTexture.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const material = obj.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        } else if (obj instanceof THREE.Sprite) {
          obj.material.dispose();
        }
      });
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // Rebuilding the whole scene on every selection change would be wasteful — that's
    // handled by the effect below instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datacenters, links, autoRotateSpeed, size]);

  useEffect(() => {
    for (const [id, ring] of ringByIdRef.current) {
      ring.visible = id === selectedId;
    }
  }, [selectedId]);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.globe, className)}
      style={{ width: size, height: size }}
    />
  );
}
