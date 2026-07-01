import * as THREE from 'three';
import { getLandRings } from './geoData';

const DEG2RAD = Math.PI / 180;

export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lng + 180) * DEG2RAD;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Draws a soft white radial gradient — tinted per-marker via SpriteMaterial.color. */
export function makeGlowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** A thin ring outline — used as the "selected" indicator sprite. */
export function makeRingTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2);
  ctx.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const MERIDIANS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const PARALLELS = [-60, -30, 0, 30, 60];

/** Sparse lat/lng wireframe — a subtle structural cue under the continent outlines. */
export function buildGraticule(radius: number, color: string): THREE.LineSegments {
  const points: THREE.Vector3[] = [];
  for (const lng of MERIDIANS) {
    for (let lat = -90; lat < 90; lat += 10) {
      points.push(latLngToVector3(lat, lng, radius));
      points.push(latLngToVector3(lat + 10, lng, radius));
    }
  }
  for (const lat of PARALLELS) {
    for (let lng = -180; lng < 180; lng += 10) {
      points.push(latLngToVector3(lat, lng, radius));
      points.push(latLngToVector3(lat, lng + 10, radius));
    }
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.35,
  });
  return new THREE.LineSegments(geometry, material);
}

/** Linearly resamples a ring so no two consecutive points are more than `maxStepDeg` apart —
 * keeps long coastline chords from cutting visibly through the sphere. */
function resampleRing(ring: number[][], maxStepDeg = 3): number[][] {
  const out: number[][] = [];
  for (let i = 0; i < ring.length; i++) {
    const [lng0, lat0] = ring[i];
    out.push([lng0, lat0]);
    const next = ring[i + 1];
    if (!next) continue;
    const [lng1, lat1] = next;
    const steps = Math.ceil(Math.max(Math.abs(lng1 - lng0), Math.abs(lat1 - lat0)) / maxStepDeg);
    for (let s = 1; s < steps; s++) {
      const t = s / steps;
      out.push([lng0 + (lng1 - lng0) * t, lat0 + (lat1 - lat0) * t]);
    }
  }
  return out;
}

/** Every coastline in the bundled world atlas, rendered as glowing line segments on the sphere. */
export function buildContinents(radius: number, color: string): THREE.LineSegments {
  const points: THREE.Vector3[] = [];
  for (const ring of getLandRings()) {
    const resampled = resampleRing(ring);
    for (let i = 0; i < resampled.length; i++) {
      const [lng0, lat0] = resampled[i];
      const [lng1, lat1] = resampled[(i + 1) % resampled.length];
      points.push(latLngToVector3(lat0, lng0, radius));
      points.push(latLngToVector3(lat1, lng1, radius));
    }
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.85,
  });
  return new THREE.LineSegments(geometry, material);
}

/** Points along a great-circle arc between two sphere points, lifted above the surface. */
export function buildArcPoints(a: THREE.Vector3, b: THREE.Vector3, radius: number, steps = 48): THREE.Vector3[] {
  const an = a.clone().normalize();
  const bn = b.clone().normalize();
  const omega = Math.acos(Math.min(1, Math.max(-1, an.dot(bn))));
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let dir: THREE.Vector3;
    if (omega < 1e-6) {
      dir = an.clone();
    } else {
      const s0 = Math.sin((1 - t) * omega) / Math.sin(omega);
      const s1 = Math.sin(t * omega) / Math.sin(omega);
      dir = new THREE.Vector3(
        an.x * s0 + bn.x * s1,
        an.y * s0 + bn.y * s1,
        an.z * s0 + bn.z * s1,
      );
    }
    const bulge = 1 + Math.sin(t * Math.PI) * 0.25;
    points.push(dir.multiplyScalar(radius * bulge));
  }
  return points;
}
