'use client';

interface Driver {
  id: string;
  name: string;
  rating: number;
  price: number;
  accepted: boolean;
}

interface DriverListProps {
  drivers: Driver[];
  onDriverSelect: (driver: Driver) => void;
  estimatedFare: number;
}

export default function DriverList({ drivers, onDriverSelect, estimatedFare }: DriverListProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-4">Conducteurs disponibles</h2>

  {estimatedFare > 0 && (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600">Prix estimé</p>
      <p className="text-xl font-bold text-green-600">{formatPrice(estimatedFare)}</p>
    </div>
  )}

  <div className="space-y-4">
    {drivers.map((driver) => (
      <div
        key={driver.id}
        className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onDriverSelect(driver)}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="font-semibold">{driver.name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm">{driver.rating}</span>
            </div>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <p className="font-bold text-green-600">
              {formatPrice(driver.price)}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
