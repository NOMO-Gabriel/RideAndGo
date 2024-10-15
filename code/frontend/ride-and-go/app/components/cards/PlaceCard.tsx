interface PlaceCardProps {
    data: any;
    closePopup: () => void;
  }
  
  const PlaceCard: React.FC<PlaceCardProps> = ({ data, closePopup }) => (
    <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 className="text-xl font-bold">Manage Place</h2>
        <p>Place: {data.startPoint || "No place selected"}</p>
        <button className="bg-red-500 p-2 rounded-md" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
  
  export default PlaceCard;
  