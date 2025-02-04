import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';

interface RoutingProps {
  start: [number, number];
  end: [number, number];
}

const Routing: React.FC<RoutingProps> = ({ start, end }) => {
  const map = useMap();
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!map) return;

    setIsMapReady(true);

    return () => {
      setIsMapReady(false);
    };
  }, [map]);

  useEffect(() => {
    if (!isMapReady || !start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      // Nettoyage : Supprimez le routage lorsqu'il n'est plus nécessaire
      if (map && routingControl) {
        routingControl.remove();
      }
    };
  }, [isMapReady, start, end, map]);

  return null; // Le composant n'a pas de contenu visuel direct
};

export default Routing;
