declare module 'leaflet' {
  export interface LatLngExpression {
    lat: number;
    lng: number;
  }

  export class LatLng implements LatLngExpression {
    constructor(lat: number, lng: number);
    lat: number;
    lng: number;
    distanceTo(other: LatLng): number;
    equals(other: LatLng): boolean;
    toString(): string;
  }

  export function latLng(lat: number, lng: number): LatLng;

  export class Layer {
    addTo(map: Map): this;
    remove(): this;
    removeFrom(map: Map): this;
    getPane(name?: string): HTMLElement | undefined;
  }

  export class Control extends Layer {
    static extend(props: any): typeof Control;
    constructor(options?: ControlOptions);
    getPosition(): string;
    setPosition(position: string): this;
    getContainer(): HTMLElement | undefined;
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
  }

  export interface ControlOptions {
    position?: string;
  }

  export class Icon {
    constructor(options: IconOptions);
    static Default: any;
  }

  export interface IconOptions {
    iconUrl: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    className?: string;
  }

  export interface MapOptions {
    center: LatLng | [number, number] | LatLngExpression;
    zoom: number;
    style?: React.CSSProperties;
    minZoom?: number;
    maxZoom?: number;
    layers?: Layer[];
    maxBounds?: LatLngBounds;
    dragging?: boolean;
    touchZoom?: boolean;
    scrollWheelZoom?: boolean;
    doubleClickZoom?: boolean;
    boxZoom?: boolean;
    keyboard?: boolean;
    zoomControl?: boolean;
    attributionControl?: boolean;
  }

  export class Map {
    constructor(element: string | HTMLElement, options?: MapOptions);
    setView(center: LatLng | [number, number] | LatLngExpression, zoom: number): this;
    setZoom(zoom: number): this;
    addLayer(layer: Layer): this;
    removeLayer(layer: Layer): this;
    hasLayer(layer: Layer): boolean;
    eachLayer(fn: (layer: Layer) => void): this;
    addControl(control: Control): this;
    removeControl(control: Control): this;
    getCenter(): LatLng;
    getZoom(): number;
    getBounds(): LatLngBounds;
    getMinZoom(): number;
    getMaxZoom(): number;
    panTo(center: LatLng | [number, number] | LatLngExpression): this;
    flyTo(center: LatLng | [number, number] | LatLngExpression, zoom?: number): this;
    remove(): void;
    invalidateSize(animate?: boolean): this;
  }

  export class LatLngBounds {
    constructor(southWest: LatLng, northEast: LatLng);
    extend(point: LatLng | LatLngBounds): this;
    getCenter(): LatLng;
    getSouthWest(): LatLng;
    getNorthEast(): LatLng;
    contains(point: LatLng | LatLngBounds): boolean;
  }

  namespace Routing {
    interface RoutingControlOptions extends ControlOptions {
      waypoints: (LatLng | [number, number])[];
      router?: any;
      show?: boolean;
      showAlternatives?: boolean;
      addWaypoints?: boolean;
      routeWhileDragging?: boolean;
      fitSelectedRoutes?: boolean;
      lineOptions?: any;
      plan?: any;
      geocoder?: any;
    }

    class Control extends Control {
      constructor(options: RoutingControlOptions);
      addTo(map: Map): this;
      getPlan(): any;
      getRouter(): any;
      setWaypoints(waypoints: LatLng[]): this;
      spliceWaypoints(index: number, waypointsToRemove: number, ...wayPoints: LatLng[]): this;
      remove(): this;
    }

    function control(options: RoutingControlOptions): Control;
  }
}

declare module 'react-leaflet' {
  import { ReactNode } from 'react';
  import { 
    LatLng, 
    MapOptions, 
    Icon, 
    Map, 
    Layer, 
    Control,
    LatLngExpression 
  } from 'leaflet';

  export interface MapContainerProps extends MapOptions {
    children?: ReactNode;
    style?: React.CSSProperties;
    center: LatLng | [number, number] | LatLngExpression;
    className?: string;
    whenCreated?: (map: Map) => void;
  }

  export function MapContainer(props: MapContainerProps): JSX.Element;
  export function TileLayer(props: { url: string; attribution?: string }): JSX.Element;
  export function Marker(props: { 
    position: LatLng | [number, number] | LatLngExpression; 
    icon?: Icon | any; 
    children?: ReactNode;
    draggable?: boolean;
    eventHandlers?: { [key: string]: (e: any) => void };
  }): JSX.Element;
  export function Popup(props: { children: ReactNode; className?: string }): JSX.Element;
  export function Polyline(props: { 
    positions: Array<LatLng | [number, number] | LatLngExpression>; 
    color?: string; 
    dashArray?: string;
    weight?: number;
    opacity?: number;
  }): JSX.Element;
  export function useMapEvents(events: { [key: string]: (e: any) => void }): null;
  export function useMap(): Map;
}

declare module 'leaflet-routing-machine' {
  export = L.Routing;
}
