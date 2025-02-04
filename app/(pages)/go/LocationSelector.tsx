interface LocationSelectorProps {
    isSelectingPickup: boolean;
    setIsSelectingPickup: (value: boolean) => void;
  }
  
  export default function LocationSelector({
    isSelectingPickup,
    setIsSelectingPickup,
  }: LocationSelectorProps) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setIsSelectingPickup(true)}
          className={`mr-2 px-4 py-2 rounded ${
            isSelectingPickup ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Point de départ
        </button>
        <button
          onClick={() => setIsSelectingPickup(false)}
          className={`px-4 py-2 rounded ${
            !isSelectingPickup ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Destination
        </button>
      </div>
    );
  }
  