export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const DEG2RAD = Math.PI / 180;

/** Lat/lng (degrees) to a point on the unit sphere. */
export function toUnitVector(lat: number, lng: number): Vec3 {
  const phi = lat * DEG2RAD;
  const lambda = lng * DEG2RAD;
  return {
    x: Math.cos(phi) * Math.sin(lambda),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lambda),
  };
}

/** Rotates a point around the vertical (yaw) then horizontal (pitch) axis, both in radians. */
export function rotate(v: Vec3, yaw: number, pitch: number): Vec3 {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = v.x * cosY + v.z * sinY;
  const y1 = v.y;
  const z1 = -v.x * sinY + v.z * cosY;

  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);
  return {
    x: x1,
    y: y1 * cosP - z1 * sinP,
    z: y1 * sinP + z1 * cosP,
  };
}

export interface Projected {
  x: number;
  y: number;
  /** -1 (far side) .. 1 (nearest to viewer) */
  depth: number;
  /** 0..1 opacity factor derived from depth — the globe is drawn as translucent glass, not solid. */
  visible: number;
  /** 0..1 size factor derived from depth, for a subtle near/far scale cue. */
  scale: number;
}

/** Orthographic projection: (x, y) become screen-space, z drives opacity/scale only. */
export function project(v: Vec3, radius: number): Projected {
  const depth = v.z;
  const t = (depth + 1) / 2;
  return {
    x: v.x * radius,
    y: -v.y * radius,
    depth,
    visible: 0.12 + t * 0.88,
    scale: 0.55 + t * 0.45,
  };
}

/** Spherical linear interpolation between two unit vectors. */
export function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const sinOmega = Math.sin(omega);
  const s0 = Math.sin((1 - t) * omega) / sinOmega;
  const s1 = Math.sin(t * omega) / sinOmega;
  return {
    x: a.x * s0 + b.x * s1,
    y: a.y * s0 + b.y * s1,
    z: a.z * s0 + b.z * s1,
  };
}

export function scaleVec(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}
