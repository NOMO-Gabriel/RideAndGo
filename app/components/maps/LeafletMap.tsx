'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapMouseEvent = {
  latlng: {
    lat: number;
    lng: number;
  };
  originalEvent: MouseEvent;
};

type MapEvent = {
  target: L.Map;
  type: string;
};

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  markers?: Array<{
    position: [number, number];
    icon?: L.Icon;
    popup?: string | React.ReactNode;
  }>;
  polylines?: Array<{
    positions: [number, number][];
    color?: string;
    dashArray?: string;
  }>;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function LeafletMap({
  center,
  zoom,
  className,
  markers = [],
  polylines = [],
  onMapClick,
}: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className || 'h-[600px]'} flex items-center justify-center bg-gray-100`}>
        Chargement de la carte...
      </div>
    );
  }

  const MapEvents = () => {
    useMapEvents({
      click: (e: MapMouseEvent) => {
        if (onMapClick) {
          onMapClick(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className || 'h-[600px]'}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {onMapClick && <MapEvents />}
      
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={marker.icon}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Marker>
      ))}

      {polylines.map((line, index) => (
        <Polyline
          key={index}
          positions={line.positions}
          color={line.color || 'blue'}
          dashArray={line.dashArray}
        />
      ))}
    </MapContainer>
  );
}
