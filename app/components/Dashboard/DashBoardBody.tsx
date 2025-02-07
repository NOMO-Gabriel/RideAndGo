'use client';
import React from 'react';
import { useDashboardContext } from "@/app/utils/contexts/DashboardContext";
import PersonalInfo from "@/app/components/Dashboard/PersonalInfos"; 
import Notifications from "@/app/components/Dashboard/Notifications"; 
import Preferences from "@/app/components/Dashboard/Preferences"; 
import Complaints from "@/app/components/Dashboard/Complaints"; 
import Itineraries from "@/app/components/Dashboard/MyItineraries"; 
import Statistics from "@/app/components/Dashboard/Statistics"; 
import Subscriptions from "@/app/components/Dashboard/Subscriptions"; 
import AllUsers from "@/app/components/Dashboard/AllUsers"; 
import MyDocuments from "@/app/components/Dashboard/MyDocuments"; 
import Chat from "@/app/components/Dashboard/Chat";

const componentsMap: Record<number, React.FC> = {
  1: PersonalInfo,
  2: Notifications,
  3: Preferences,
  4: Complaints,
  5: Itineraries,
  6: Statistics,
  7: Subscriptions,
  9: Chat,
  10: AllUsers,
  11: MyDocuments
};

const DashBoardBody: React.FC = () => {
  const { dashboardFilter } = useDashboardContext(); 
  const ComponentToRender = componentsMap[dashboardFilter]; 

  return (
    <div className="flex-1 p-4">
      {/* Render the corresponding component */}
      {ComponentToRender ? <ComponentToRender /> : <div>Please select a filter.</div>}
    </div>
  );
};

export default DashBoardBody;
