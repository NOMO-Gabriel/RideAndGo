interface OfferCardProps {
  data: any;
  closePopup: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ data, closePopup }) => (
  <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
      <h2 className="text-xl font-bold">Confirm Your Order</h2>
      <p>Start Point: {data.startPoint}</p>
      <p>End Point: {data.endPoint}</p>
      <p>Cost: {data.cost} FCFA</p>
      <p>Places: {data.places}</p>
      <p>Baggage: {data.baggage}</p>
      <button className="bg-green-500 p-2 rounded-md" onClick={closePopup}>
        Confirm
      </button>
    </div>
  </div>
);

export default OfferCard;
