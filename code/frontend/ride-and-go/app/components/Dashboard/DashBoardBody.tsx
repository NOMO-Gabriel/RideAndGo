'use client';
import React from 'react';
import { useDashboardContext } from "@/app/utils/contexts/DashboardContext";
import PersonalInfo from "@/app/components/Dashboard/PersonalInfos"; // Exemple d'import pour le composant
import Notifications from "@/app/components/Dashboard/Notifications"; // Exemple d'import pour le composant
import Preferences from "@/app/components/Dashboard/Preferences"; // Exemple d'import pour le composant
import Complaints from "@/app/components/Dashboard/Complaints"; // Exemple d'import pour le composant
import Itineraries from "@/app/components/Dashboard/MyItineraries"; // Exemple d'import pour le composant
import Statistics from "@/app/components/Dashboard/Statistics"; // Exemple d'import pour le composant
import Subscriptions from "@/app/components/Dashboard/Subscriptions"; // Exemple d'import pour le composant
import AllUsers from "@/app/components/Dashboard/AllUsers"; // Exemple d'import pour le composant

const componentsMap: Record<number, React.FC> = {
  1: PersonalInfo,
  2: Notifications,
  3: Preferences,
  4: Complaints,
  5: Itineraries,
  6: Statistics,
  7: Subscriptions,
  10: AllUsers
};

const DashBoardBody: React.FC = () => {
  const { dashboardFilter } = useDashboardContext(); // Get the current filter ID from context
  const ComponentToRender = componentsMap[dashboardFilter]; // Determine the component to render based on the filter ID

  return (
    <div className="flex-1 p-4">
      {/* Render the corresponding component */}
      {ComponentToRender ? <ComponentToRender /> : <div>Please select a filter.</div>}
    </div>
  );
};

export default DashBoardBody;
