interface ItineraryCardProps {
  data: any;
  closePopup: () => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ data, closePopup }) => (
  <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
      <h2 className="text-xl font-bold">Save Itinerary</h2>
      <p>Start Point: {data.startPoint}</p>
      <p>End Point: {data.endPoint}</p>
      <button className="bg-blue-500 p-2 rounded-md" onClick={closePopup}>
        Save
      </button>
    </div>
  </div>
);

export default ItineraryCard;
