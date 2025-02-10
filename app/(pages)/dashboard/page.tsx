'use client';
import BecomeDriverContainer from "@/app/components/Dashboard/BecomeDriverContainer";
import DashBoardBody from "@/app/components/Dashboard/DashBoardBody";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import { DashboardProvider } from "@/app/utils/contexts/DashboardContext";

export default function Page() {
  return (
    <DashboardProvider>
      <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
        {/* Sidebar - Hidden on mobile, shown as overlay or drawer */}
        <div className="fixed lg:relative lg:flex w-[250px] bg-white h-screen transition-transform duration-300 ease-in-out 
          -translate-x-full lg:translate-x-0 z-30">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white w-full transition-all duration-300 ease-in-out
          lg:ml-[250px]">
          {/* Container with responsive padding */}
          <div className="px-4 md:px-8 lg:px-12 xl:px-20 py-4 space-y-4">
            {/* Become Driver Section */}
            <div className="w-full">
              <BecomeDriverContainer />
            </div>

            {/* Dashboard Body */}
            <div className="w-full">
              <DashBoardBody />
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden 
          transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none">
          {/* Click handler to close sidebar */}
        </div>
      </div>
    </DashboardProvider>
  );
};
