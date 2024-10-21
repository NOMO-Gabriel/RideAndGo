'use client';
import BecomeDriverContainer from "@/app/components/Dashboard/BecomeDriverContainer";
import DashBoardBody from "@/app/components/Dashboard/DashBoardBody";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import { DashboardProvider } from "@/app/utils/contexts/DashboardContext";

export default function Page() {
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
            <DashBoardBody/>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
