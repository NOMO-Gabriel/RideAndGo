import { useSearchFilter } from "@/app/utils/hooks/useSearchFilter";
import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Link from "next/link";

const InfoBoard: React.FC = () => {
  const { searchData } = useSearchFilter();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { locale } = useLocale();

  const isUserLoggedIn = () => {
    return false; 
  };

  const handleAction = (action: string) => {
    if (!isUserLoggedIn()) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const content = {
    fr: {
      title: "Infos",
      start: "Arrivée",
      end: "Départ",
      place: "Lieu",
      cost: "Coût",
      command: "Commander un taxi",
      save: "Enregistrer",
      suscribe: "Inscrivez-vous maintenant",
      popUpMessage: "Vous devez avoir un compte pour pouvoir commander ou enregistrer.",
      close: "Fermer",
    },
    en: {
      title: "Info",
      start: "End Point",
      end: "Start Point",
      place: "Place",
      cost: "Cost",
      command: "Order a taxi",
      save: "Save",
      suscribe: "Subscribe now",
      popUpMessage: "You need an account to save data or order a taxi.",
      close: "Close",
    },
  };

  const getContent = (key: keyof typeof content["en"]) => {
    const validLocale = ["fr", "en"].includes(locale) ? locale : "en";
    return content[validLocale as "fr" | "en"][key];
  };

  return (
    <div className={`info-board flex flex-col items-center border rounded-lg shadow-md p-6 bg-white space-y-4 w-[300px] h-max `}>
      <h1 className="text-2xl font-bold text-bleu-nuit">{getContent("title")}</h1>

      {searchData.isItinerary ? (
        <div className="flex flex-col space-y-2 rounded-md">
          <p className="text-md border p-2">
            <span className="font-semibold text-bleu-nuit">{getContent("start")}: </span>
            {searchData.startPoint.name}
          </p>
          <p className="text-md  border  p-2 rounded-md">
            <span className="font-semibold  text-bleu-nuit">{getContent("end")}: </span>
            {searchData.endPoint.name}
          </p>
          <p className="text-md  border  p-2 rounded-md">
            <span className="font-semibold  text-bleu-nuit">{getContent("cost")}: </span>
            {searchData.cost} FCFA
          </p>
        </div>
      ) : (
        <div className="text-md">
          <p>
            <span className="font-semibold">{getContent("place")}: </span>
            {searchData.place.name}
          </p>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded-md transition"
          onClick={() => handleAction("order")}
        >
          {getContent("command")}
        </button>
        <button
          className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded-md transition"
          onClick={() => handleAction("save")}
        >
          {getContent("save")}
        </button>
      </div>

      {showPopup && (
        <div className="popup flex items-center justify-center bg-black bg-opacity-50 fixed inset-0 ">
          <div className="bg-gray-100 rounded-lg p-6 shadow-lg max-w-sm space-y-4 text-center justify-center flex flex-col">
            <p className="text-lg text-orange-500">{getContent("popUpMessage")}</p>
            
            <div className="flex flex-row space-x-2 p-2 mt-2 justify-between">
              <button
                className="bg-red-300 text-white p-2 rounded-md hover:bg-red-600 transition "
                onClick={closePopup}
              >
                {getContent("close")}
              </button>
              
              <Link
                href="/login"
                className="block text-white bg-bleu-nuit hover:bg-orange-500  p-2  rounded-md"
              >
                {getContent("suscribe")}
              </Link>
   
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBoard;
