import { useCallback, useEffect, useId, useMemo, useRef, useState, type PointerEvent } from 'react';
import { clsx } from 'clsx';
import { toUnitVector, rotate, project, slerp, scaleVec } from './geometry';
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
  /** Degrees per second while idle (not being dragged). */
  autoRotateSpeed?: number;
  className?: string;
}

const STATUS_COLOR: Record<DatacenterStatus, string> = {
  online: 'var(--teal-300)',
  warning: 'var(--amber-400)',
  critical: 'var(--red-500)',
};

const LINK_COLOR: Record<GlobeLinkStatus, string> = {
  active: 'var(--teal-400)',
  degraded: 'var(--amber-400)',
};

const MERIDIANS = [0, 45, 90, 135, 180, 225, 270, 315];
const PARALLELS = [-60, -30, 0, 30, 60];
const GRATICULE_STEP = 10;
const LINK_STEPS = 16;
const LINK_SEGMENTS = 4;
const RESUME_DELAY_MS = 1200;

const GRATICULE_LINES: [number, number][][] = [
  ...MERIDIANS.map((lng) => {
    const points: [number, number][] = [];
    for (let lat = -90; lat <= 90; lat += GRATICULE_STEP) points.push([lat, lng]);
    return points;
  }),
  ...PARALLELS.map((lat) => {
    const points: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += GRATICULE_STEP) points.push([lat, lng]);
    return points;
  }),
];

/**
 * Lightweight rotating 3D globe rendered as SVG (orthographic projection, no WebGL
 * dependency). Auto-rotates when idle; drag with pointer to spin manually. Datacenters
 * are unit-sphere markers, links are elevated great-circle arcs faded by depth so the
 * globe reads as a translucent hologram rather than an opaque sphere.
 */
export function Globe3D({
  datacenters,
  links,
  selectedId,
  onSelect,
  size = 280,
  autoRotateSpeed = 6,
  className,
}: Globe3DProps) {
  const uid = useId();
  const glowFilterId = `globe-glow-${uid}`;
  const atmosphereId = `globe-atmosphere-${uid}`;

  const [yaw, setYaw] = useState(0.6);
  const [pitch, setPitch] = useState(-0.25);
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const lastInteractionRef = useRef(0);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    function tick(t: number) {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = t;
      const dt = (t - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = t;

      const idleFor = t - lastInteractionRef.current;
      if (!dragRef.current && idleFor > RESUME_DELAY_MS) {
        setYaw((y) => y + (autoRotateSpeed * Math.PI) / 180 * dt);
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [autoRotateSpeed]);

  const handlePointerDown = useCallback((e: PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, yaw, pitch };
    lastInteractionRef.current = performance.now();
    setDragging(true);
  }, [yaw, pitch]);

  const handlePointerMove = useCallback((e: PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setYaw(dragRef.current.yaw + dx * 0.008);
    setPitch(Math.max(-1.3, Math.min(1.3, dragRef.current.pitch - dy * 0.008)));
    lastInteractionRef.current = performance.now();
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent<SVGSVGElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
    lastInteractionRef.current = performance.now();
    setDragging(false);
  }, []);

  const radius = size / 2 - 20;

  const projectedDatacenters = useMemo(
    () => datacenters.map((dc) => ({
      dc,
      ...project(rotate(toUnitVector(dc.lat, dc.lng), yaw, pitch), radius),
    })),
    [datacenters, yaw, pitch, radius],
  );

  const datacenterById = useMemo(
    () => new Map(datacenters.map((d) => [d.id, d])),
    [datacenters],
  );

  const projectedLinks = useMemo(() => {
    return links.flatMap((link) => {
      const from = datacenterById.get(link.from);
      const to = datacenterById.get(link.to);
      if (!from || !to) return [];

      const a = toUnitVector(from.lat, from.lng);
      const b = toUnitVector(to.lat, to.lng);
      const pointsPerSegment = LINK_STEPS / LINK_SEGMENTS;

      const segments: { key: string; d: string; opacity: number }[] = [];
      let path: string[] = [];
      let visibleSum = 0;
      let visibleCount = 0;

      for (let i = 0; i <= LINK_STEPS; i++) {
        const t = i / LINK_STEPS;
        const bulge = 1 + Math.sin(t * Math.PI) * 0.18;
        const point = rotate(scaleVec(slerp(a, b, t), bulge), yaw, pitch);
        const p = project(point, radius);
        path.push(`${path.length === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`);
        visibleSum += p.visible;
        visibleCount++;

        if (path.length > pointsPerSegment || i === LINK_STEPS) {
          segments.push({
            key: `${link.id}-${segments.length}`,
            d: path.join(' '),
            opacity: visibleSum / visibleCount,
          });
          path = [`M${p.x.toFixed(1)},${p.y.toFixed(1)}`];
          visibleSum = 0;
          visibleCount = 0;
        }
      }
      return segments.map((seg) => ({ ...seg, status: link.status }));
    });
  }, [links, datacenterById, yaw, pitch, radius]);

  const graticulePaths = useMemo(
    () => GRATICULE_LINES.map((points) => points
      .map(([lat, lng], i) => {
        const p = project(rotate(toUnitVector(lat, lng), yaw, pitch), radius);
        return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(' ')),
    [yaw, pitch, radius],
  );

  return (
    <svg
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      width={size}
      height={size}
      className={clsx(styles.globe, dragging && styles.dragging, className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <defs>
        <radialGradient id={atmosphereId} cx="50%" cy="50%" r="50%">
          <stop offset="65%" stopColor="var(--teal-400)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--teal-400)" stopOpacity="0.22" />
        </radialGradient>
        <filter id={glowFilterId} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle r={radius + 8} fill={`url(#${atmosphereId})`} />
      <circle r={radius} className={styles.sphere} />

      <g className={styles.grid}>
        {graticulePaths.map((d, i) => <path key={i} d={d} />)}
      </g>

      <g>
        {projectedLinks.map((seg) => (
          <path
            key={seg.key}
            d={seg.d}
            stroke={LINK_COLOR[seg.status]}
            strokeOpacity={seg.opacity}
            className={styles.link}
          />
        ))}
      </g>

      <g>
        {projectedDatacenters.map(({ dc, x, y, visible, scale }) => (
          <g
            key={dc.id}
            transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)})`}
            opacity={visible}
            className={styles.marker}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onSelect?.(dc.id)}
          >
            {dc.id === selectedId && (
              <circle r={7 * scale} className={styles.markerRing} stroke={STATUS_COLOR[dc.status]} />
            )}
            <circle r={3.5 * scale} fill={STATUS_COLOR[dc.status]} filter={`url(#${glowFilterId})`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
