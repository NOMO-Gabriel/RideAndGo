import { useState } from 'react';
import MapContainerComponent from './MapComponent';
import LocationSelector from './LocationSelector';
import FareCalculator from './FareCalculator';
import DriverSelector from './DriverSelector';
import { Driver } from './types'; 

export default function ClientDashboard() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number>(0);
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'Ngono Jean', rating: 4.8, price: 2500, accepted: false },
    { id: '2', name: 'Nganou Pierre', rating: 4.9, price: 2800, accepted: false },
  ]);
  const [isSelectingPickup, setIsSelectingPickup] = useState(true);

  const handleLocationSelect = (location: Location) => {
    if (isSelectingPickup) {
      setPickup(location);
    } else {
      setDestination(location);
    }
  };

  const handleAcceptDriver = (driverId: string) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId ? { ...driver, accepted: true } : { ...driver, accepted: false }
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 bg-gradient-to-r from-orange-400 to-blue-900">
        <h1 className="text-3xl font-bold text-white">Réserver un trajet</h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MapContainerComponent
            pickup={pickup}
            destination={destination}
            onLocationSelect={handleLocationSelect}
          />
          <div className="space-y-6">
            <LocationSelector
              isSelectingPickup={isSelectingPickup}
              setIsSelectingPickup={setIsSelectingPickup}
            />
            <FareCalculator
              pickup={pickup}
              destination={destination}
              setEstimatedFare={setEstimatedFare}
            />
            <DriverSelector
              drivers={drivers}
              handleAcceptDriver={handleAcceptDriver}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
