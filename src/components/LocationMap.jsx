import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Clock, Route as RouteIcon, ArrowUpRight } from 'lucide-react';
import { AIRPORT, RESORT, ROUTES } from '../data/airportRoute';
import './LocationMap.css';

const PLANE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>';

const airportIcon = L.divIcon({
  className: 'lm-marker lm-marker--airport',
  html: `<span class="lm-marker__badge">${PLANE_SVG}</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  tooltipAnchor: [17, 0],
});

const resortIcon = L.divIcon({
  className: 'lm-marker lm-marker--resort',
  html: '<span class="lm-marker__pulse"></span><span class="lm-marker__dot"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  tooltipAnchor: [11, 0],
});

const GMAPS_URL =
  'https://www.google.com/maps/dir/?api=1' +
  '&origin=Bandaranaike+International+Airport' +
  `&destination=${RESORT.lat},${RESORT.lng}&travelmode=driving`;

/* Re-frames the map on the active route whenever the selection changes,
   and refits after container resizes (orientation change, window resize).
   Skips by value (not a run-once flag) so StrictMode's double effect
   invocation in dev does not trigger a phantom fly on mount. */
function FitActiveRoute({ coords }) {
  const map = useMap();
  const prevCoords = useRef(coords);
  const coordsRef = useRef(coords);
  coordsRef.current = coords;

  useEffect(() => {
    if (prevCoords.current === coords) return;
    prevCoords.current = coords;
    const bounds = L.latLngBounds(coords);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      map.fitBounds(bounds, { padding: [48, 48], animate: false });
    } else {
      map.flyToBounds(bounds, { padding: [48, 48], duration: 0.9 });
    }
  }, [coords, map]);

  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        map.fitBounds(L.latLngBounds(coordsRef.current), {
          padding: [48, 48],
          animate: false,
        });
      }, 200);
    };
    map.on('resize', onResize);
    return () => {
      clearTimeout(timer);
      map.off('resize', onResize);
    };
  }, [map]);

  return null;
}

/* Names the map region for assistive tech, and keeps one-finger dragging off
   whenever the device has any touch pointer (so touch always scrolls the page
   past the map; pinch-zoom and the zoom buttons still work). Re-evaluates on
   input-capability changes instead of a single mount-time check. */
function MapChrome() {
  const map = useMap();

  useEffect(() => {
    const el = map.getContainer();
    el.setAttribute('role', 'region');
    el.setAttribute(
      'aria-label',
      'Interactive map of driving routes from Bandaranaike International Airport to Ocean View Villas'
    );
  }, [map]);

  useEffect(() => {
    const mq = window.matchMedia('(any-pointer: coarse)');
    const apply = () => {
      if (mq.matches) {
        map.dragging.disable();
      } else {
        map.dragging.enable();
      }
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [map]);

  return null;
}

export default function LocationMap() {
  const [activeId, setActiveId] = useState(ROUTES[0].id);

  const activeRoute = ROUTES.find((r) => r.id === activeId);
  const inactiveRoutes = ROUTES.filter((r) => r.id !== activeId);

  const allBounds = useMemo(
    () => L.latLngBounds(ROUTES.flatMap((r) => r.coords)),
    []
  );

  return (
    <section
      id='location'
      className='location-map'
      aria-labelledby='location-map-title'
    >
      <div className='location-map__intro'>
        <p className='location-map__label'>Getting here</p>
        <h2 id='location-map-title'>
          Minutes from the runway, a world away.
        </h2>
        <p className='location-map__copy'>
          Ocean View Villas sits on the Uswetakeiyawa shoreline, an easy drive
          south of Bandaranaike International Airport, about{' '}
          {ROUTES[0].mins} minutes and {ROUTES[0].km} km via the{' '}
          {ROUTES[0].label}, or a slower run down the old Negombo Road.
        </p>
      </div>

      <div className='location-map__frame'>
        <div
          className='location-map__chips'
          role='group'
          aria-label='Route options from the airport'
        >
          {ROUTES.map((route) => (
            <button
              key={route.id}
              type='button'
              onClick={() => setActiveId(route.id)}
              className={`location-map__chip${
                route.id === activeId ? ' is-active' : ''
              }`}
              aria-pressed={route.id === activeId}
            >
              <span className='sr-only'>{route.label} &mdash; </span>
              <Clock aria-hidden='true' />
              <span>{route.mins} min</span>
              <RouteIcon aria-hidden='true' />
              <span>{route.km} km</span>
              {route.fastest && (
                <span className='location-map__chip-badge'>Fastest</span>
              )}
            </button>
          ))}
        </div>

        <MapContainer
          bounds={allBounds}
          boundsOptions={{ padding: [48, 48] }}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom
          zoomControl={false}
          className='location-map__canvas'
        >
          <ZoomControl position='bottomleft' />
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains='abcd'
            maxZoom={19}
          />

          <MapChrome />
          <FitActiveRoute coords={activeRoute.coords} />

          {inactiveRoutes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.coords}
              pathOptions={{
                color: '#5d6873',
                weight: 3,
                opacity: 0.65,
                lineCap: 'round',
                lineJoin: 'round',
              }}
              eventHandlers={{
                click: () => setActiveId(route.id),
                mouseover: (e) => e.target.setStyle({ opacity: 1 }),
                mouseout: (e) => e.target.setStyle({ opacity: 0.65 }),
              }}
            >
              <Tooltip sticky className='lm-tip'>
                {route.label} &middot; {route.mins} min &middot; {route.km} km
              </Tooltip>
            </Polyline>
          ))}

          <Polyline
            key={`${activeRoute.id}-casing`}
            positions={activeRoute.coords}
            interactive={false}
            pathOptions={{
              color: '#05070a',
              weight: 8,
              opacity: 0.85,
              lineCap: 'round',
              lineJoin: 'round',
            }}
            eventHandlers={{ add: (e) => e.target.bringToFront() }}
          />
          <Polyline
            key={activeRoute.id}
            positions={activeRoute.coords}
            pathOptions={{
              color: '#e7ab4d',
              weight: 4,
              opacity: 1,
              lineCap: 'round',
              lineJoin: 'round',
            }}
            eventHandlers={{ add: (e) => e.target.bringToFront() }}
          >
            <Tooltip sticky className='lm-tip'>
              {activeRoute.label} &middot; {activeRoute.mins} min &middot;{' '}
              {activeRoute.km} km
            </Tooltip>
          </Polyline>

          <Marker
            position={[AIRPORT.lat, AIRPORT.lng]}
            icon={airportIcon}
            keyboard={false}
            title={`${AIRPORT.code} · ${AIRPORT.name}`}
          >
            <Tooltip
              permanent
              direction='right'
              className='lm-tip lm-tip--label'
            >
              <span className='lm-tip__full'>
                {AIRPORT.code} &middot; {AIRPORT.name}
              </span>
              <span className='lm-tip__short'>{AIRPORT.code} Airport</span>
            </Tooltip>
          </Marker>
          <Marker
            position={[RESORT.lat, RESORT.lng]}
            icon={resortIcon}
            keyboard={false}
            title={`${RESORT.name} — ${RESORT.locality}`}
          >
            <Tooltip
              permanent
              direction='right'
              className='lm-tip lm-tip--label lm-tip--resort'
            >
              {RESORT.name}
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>

      <div className='location-map__foot'>
        <p>
          {AIRPORT.code} &middot; Bandaranaike International Airport &rarr;{' '}
          {RESORT.name}, {RESORT.locality}
        </p>
        <a href={GMAPS_URL} target='_blank' rel='noopener noreferrer'>
          Open in Google Maps
          <ArrowUpRight aria-hidden='true' />
        </a>
      </div>
    </section>
  );
}
