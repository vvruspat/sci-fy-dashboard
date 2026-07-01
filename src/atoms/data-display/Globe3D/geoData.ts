import { feature } from 'topojson-client';
import landTopology from 'world-atlas/land-110m.json';

/** A closed coastline loop as an array of [lng, lat] points. */
export type Ring = number[][];

let cachedRings: Ring[] | null = null;

/** Every landmass coastline ring in the bundled 110m-resolution world atlas. */
export function getLandRings(): Ring[] {
  if (cachedRings) return cachedRings;

  // world-atlas ships raw TopoJSON; topojson-client's typings are keyed to a specific
  // geometry type per overload, which doesn't match this generically-typed JSON import.
  const topology = landTopology as unknown as Parameters<typeof feature>[0];
  const object = (landTopology as unknown as { objects: { land: Parameters<typeof feature>[1] } }).objects.land;
  const collection = feature(topology, object) as GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>;

  const rings: Ring[] = [];
  for (const feat of collection.features) {
    for (const polygon of feat.geometry.coordinates) {
      for (const ring of polygon) rings.push(ring);
    }
  }
  cachedRings = rings;
  return rings;
}
