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
  const [isMapReady, setIsMapReady] = useState(false); // State to track if the map is ready

  useEffect(() => {
    if (!map) return; // Ensure the map instance is available

    setIsMapReady(true); // Set the map as ready once the map instance is available

    return () => {
      setIsMapReady(false); // Clean up when the component unmounts
    };
  }, [map]);

  useEffect(() => {
    if (!isMapReady || !start || !end) return; // Check if the map is ready and both points are available

    // Create the routing control with the provided waypoints
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
    }).addTo(map); // Add the control to the existing map

    return () => {
      map.removeControl(routingControl); // Clean up on unmount
    };
  }, [isMapReady, map, start, end]); // Effect dependencies

  return null; // This component does not render anything
};

export default Routing;
