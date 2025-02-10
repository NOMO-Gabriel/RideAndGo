'use client';
import BecomeDriverContainer from "@/app/components/Dashboard/BecomeDriverContainer";
import DashBoardBody from "@/app/components/Dashboard/DashBoardBody";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import { DashboardProvider } from "@/app/utils/contexts/DashboardContext";

export default function Page() {
  return (
    <DashboardProvider>
      <div className="flex flex-row px-4 sm:px-2 md:px-20 bg-gray-100 mt-2 min-h-screen">
        {/* Sidebar */}
        <div className="flex flex-col w-22 sm:w-10 md:w-40 lg:w-60 bg-white">
          <Sidebar />
        </div>
  
        {/* Right-side content */}
        <div className="flex flex-col flex-grow bg-white">
          <div>
            <BecomeDriverContainer />
          </div>
          <div>
            <DashBoardBody />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
  
}  