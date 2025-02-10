'use client';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface LocationSelectorProps {
  pickup: Location | null;
  destination: Location | null;
  isSelectingPickup: boolean;
  onToggleLocationSelect: () => void;
}

export default function LocationSelector({
  pickup,
  destination,
  isSelectingPickup,
  onToggleLocationSelect,
}: LocationSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-4">Sélection du trajet</h2>

  <div className="space-y-4">
    {/* Point de départ */}
    <div
      className={`p-3 rounded-lg cursor-pointer border-2 transition-colors ${
        isSelectingPickup ? 'border-blue-500' : 'border-gray-200'
      }`}
      onClick={() => onToggleLocationSelect()}
    >
      <p className="text-sm text-gray-500">Point de départ</p>
      {pickup ? (
        <p className="font-medium">
          {pickup.address || `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}`}
        </p>
      ) : (
        <p className="text-gray-400">Cliquez pour sélectionner</p>
      )}
    </div>

    {/* Destination */}
    <div
      className={`p-3 rounded-lg cursor-pointer border-2 transition-colors ${
        !isSelectingPickup ? 'border-blue-500' : 'border-gray-200'
      }`}
      onClick={() => onToggleLocationSelect()}
    >
      <p className="text-sm text-gray-500">Destination</p>
      {destination ? (
        <p className="font-medium">
          {destination.address || `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}`}
        </p>
      ) : (
        <p className="text-gray-400">Cliquez pour sélectionner</p>
      )}
    </div>
  </div>
</div>

    
  );
}
