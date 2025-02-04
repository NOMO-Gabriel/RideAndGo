'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  children?: React.ReactNode;
  center: [number, number];
  zoom: number;
  className?: string;
}

export default function MapComponent({ children, center, zoom, className }: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className || 'h-[600px] w-full'}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
}
