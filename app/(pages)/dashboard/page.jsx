'use client';
import BecomeDriverContainer from "@/app/components/Dashboard/BecomeDriverContainer";
import DashBoardBody from "@/app/components/Dashboard/DashBoardBody";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import { DashboardProvider } from "@/app/utils/contexts/DashboardContext";
import NotificationManager from "../../components/flash_message/NotificationManager.tsx";
import { useRef } from "react";

export default function Page() {
  const notificationManager = useRef(null);

  const handleNewClient = (client) => {
    notificationManager.current?.addNotification(
      `Nouveau client : ${client.name} à ${client.location}`
    );
  };

  const handleEvent = () => {
    notificationManager.current?.addNotification(
      "Nouveau client disponible à 500 mètres"
    );
  };
  
  return (
    // Wrap the entire dashboard with DashboardProvider
    <DashboardProvider>
      <div className="flex flex-row px-20 bg-gray-100 mt-2 min-h-screen ">
        {/* Sidebar */}
        <div className="flex flex-col w-[250px] bg-white">
          <Sidebar />
        </div>

        {/* Right-side content */}
        <div className="w-full flex flex-col bg-white">
          <div>
            <BecomeDriverContainer />
          </div>
          <div>
            {/* <DashBoardBody/> */}
            <NotificationManager ref={notificationManager} /> 
            {/* Button to trigger handleEvent */}
            <button 
              onClick={handleEvent} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Trigger Notification
            </button>
            
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
