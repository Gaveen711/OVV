/* Regenerates src/data/airportRoute.js with two genuinely distinct corridors:
 *  - expressway: airport -> resort direct (OSRM's fastest, via the E03)
 *  - negombo:    airport -> Kandana (A3) -> resort surface-road alternative
 * Strips OSRM via-waypoint U-turn spurs, validates distinctness, recomputes km/mins.
 * Usage: node scripts/generate-airport-routes.js  (uses the public OSRM demo server) */
const fs = require('fs');
const path = require('path');

const AIRPORT = [79.8830, 7.1745];
const RESORT = [79.8615, 7.0310];
const VIA = {
  expressway: null, // direct fastest route — uses the E03 Katunayake Expressway
  negombo: [79.89820, 7.04950], // Kandana town on the A3
};

const round = (n) => Math.round(n * 1e5) / 1e5;

function haversine(a, b) {
  // a, b are [lat, lng]
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function lengthKm(coords) {
  let m = 0;
  for (let i = 1; i < coords.length; i++) m += haversine(coords[i - 1], coords[i]);
  return m / 1000;
}

/* Remove out-and-back spurs: if the path returns to within `tol` meters of an
 * earlier point after a short excursion, drop the excursion. Repeat to fixpoint. */
function stripSpurs(coords, tol = 25, maxSpan = 120) {
  let out = coords.slice();
  let changed = true;
  while (changed) {
    changed = false;
    outer: for (let i = 0; i < out.length; i++) {
      const maxJ = Math.min(out.length - 1, i + maxSpan);
      for (let j = maxJ; j > i + 3; j--) {
        if (haversine(out[i], out[j]) < tol) {
          // candidate loop i..j — only cut if it is a dead-end (max distance from
          // the junction is small relative to loop length => out-and-back shape)
          const loop = out.slice(i, j + 1);
          const loopLen = lengthKm(loop) * 1000;
          let maxDev = 0;
          for (const p of loop) maxDev = Math.max(maxDev, haversine(out[i], p));
          if (loopLen > 60 && maxDev < loopLen * 0.45) {
            out = out.slice(0, i + 1).concat(out.slice(j + 1));
            changed = true;
            break outer;
          }
        }
      }
    }
  }
  return out;
}

function toLatLng(geo) {
  const seen = [];
  let prev = null;
  for (const [lon, lat] of geo.coordinates) {
    const p = [round(lat), round(lon)];
    if (!prev || p[0] !== prev[0] || p[1] !== prev[1]) seen.push(p);
    prev = p;
  }
  return seen;
}

async function fetchRoute(id) {
  const via = VIA[id] ? [VIA[id]] : [];
  const pts = [AIRPORT, ...via, RESORT].map((p) => p.join(',')).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${pts}?overview=full&geometries=geojson&steps=false`;
  const res = await fetch(url, { headers: { 'User-Agent': 'OVV-website-dev (admin@emeraldisle.lk)' } });
  const data = await res.json();
  if (data.code !== 'Ok') throw new Error(`${id}: OSRM ${data.code}`);
  const r = data.routes[0];
  const raw = toLatLng(r.geometry);
  const cleaned = stripSpurs(raw);
  const rawKm = lengthKm(raw);
  const cleanKm = lengthKm(cleaned);
  const mins = Math.round((r.duration / 60) * (cleanKm / rawKm));
  return {
    id,
    raw: raw.length,
    coords: cleaned,
    km: +cleanKm.toFixed(1),
    mins,
    osrmKm: +(r.distance / 1000).toFixed(1),
    osrmMins: Math.round(r.duration / 60),
  };
}

(async () => {
  const expressway = await fetchRoute('expressway');
  const negombo = await fetchRoute('negombo');

  // The expressway route is direct (no via), so its OSRM distance/duration are the
  // real driving figures — the geometry cleanup only trims the visual ramp tongue.
  expressway.km = expressway.osrmKm;
  expressway.mins = expressway.osrmMins;

  // validation
  const key = (p) => p.join(',');
  const set1 = new Set(expressway.coords.map(key));
  const shared = negombo.coords.filter((p) => set1.has(key(p))).length;
  const overlap = shared / negombo.coords.length;
  const inBox = (p) => p[0] > 6.95 && p[0] < 7.25 && p[1] > 79.79 && p[1] < 79.96;
  const allValid = [...expressway.coords, ...negombo.coords].every(
    (p) => inBox(p) && Number.isFinite(p[0]) && Number.isFinite(p[1])
  );
  const endsOk = [expressway, negombo].every(
    (r) =>
      haversine(r.coords[0], [7.1745, 79.883]) < 600 &&
      haversine(r.coords[r.coords.length - 1], [7.031, 79.8615]) < 300
  );

  console.log('expressway:', expressway.raw, '->', expressway.coords.length, 'pts |', expressway.km, 'km', expressway.mins, 'min');
  console.log('negombo:', negombo.raw, '->', negombo.coords.length, 'pts |', negombo.km, 'km', negombo.mins, 'min (osrm', negombo.osrmKm, 'km', negombo.osrmMins, 'min)');
  console.log('overlap fraction:', overlap.toFixed(2), '| coords valid:', allValid, '| endpoints ok:', endsOk);

  if (overlap > 0.6) throw new Error('routes still overlap too much');
  if (!allValid || !endsOk) throw new Error('validation failed');

  const fastest = expressway.mins <= negombo.mins ? 'expressway' : 'negombo';
  const routes = [
    { id: 'expressway', label: 'E03 Expressway', via: 'via Katunayake Expwy', km: expressway.km, mins: expressway.mins, fastest: fastest === 'expressway', coords: expressway.coords },
    { id: 'negombo', label: 'Negombo Road', via: 'via A3 \\u00b7 Kandana', km: negombo.km, mins: negombo.mins, fastest: fastest === 'negombo', coords: negombo.coords },
  ];
  // fastest route first (its chip carries the badge)
  routes.sort((a, b) => a.mins - b.mins);

  const file =
    '/* Driving routes from Bandaranaike International Airport (CMB) to Ocean View Villas,\n' +
    ' * Uswetakeiyawa. Geometry precomputed via OSRM (OpenStreetMap data, 2026-07-25) with\n' +
    ' * via-points on the coast road (Pamunugama) and the A3 (Kandana), then cleaned of\n' +
    ' * routing artifacts and embedded statically so the map never depends on a routing\n' +
    ' * service at runtime. Coordinates are [lat, lng] pairs for Leaflet.\n */\n\n' +
    "export const AIRPORT = { lat: 7.17441, lng: 79.88659, code: 'CMB', name: 'Bandaranaike Int\\u2019l Airport' };\n\n" +
    "export const RESORT = { lat: 7.03096, lng: 79.86151, name: 'Ocean View Villas', locality: 'Uswetakeiyawa' };\n\n" +
    'export const ROUTES = ' +
    JSON.stringify(routes)
      .replace(/"([a-z]+)":/g, '$1: ')
      .replace(/"/g, "'") +
    ';\n';

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'airportRoute.js'), file);
  console.log('written', file.length, 'bytes | fastest:', fastest);
})();
