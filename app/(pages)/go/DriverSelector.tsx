import { Driver } from './types';

interface DriverSelectorProps {
  drivers: Driver[];
  handleAcceptDriver: (driverId: string) => void;
}

export default function DriverSelector({
  drivers,
  handleAcceptDriver,
}: DriverSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Sélectionner un conducteur</label>
      <div className="space-y-2">
        {drivers.map((driver) => (
          <div key={driver.id} className="flex justify-between items-center">
            <span className="text-lg font-medium">{driver.name}</span>
            <span className="text-sm text-gray-600">{driver.rating} ⭐</span>
            <button
              type="button"
              onClick={() => handleAcceptDriver(driver.id)}
              className={`px-4 py-2 rounded ${driver.accepted ? 'bg-green-500' : 'bg-blue-500'}`}
            >
              {driver.accepted ? 'Accepté' : 'Accepter'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
