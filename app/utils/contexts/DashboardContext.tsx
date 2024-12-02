'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context
interface DashboardContextType {
  dashboardFilter: number;
  updateDashboardFilter: (filterName: number) => void;
}

// Initialize the context with undefined by default
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Define the type for the Provider props
interface DashboardProviderProps {
  children: ReactNode;
}

// DashboardProvider to manage the filter state
export function DashboardProvider({ children }: DashboardProviderProps) {
  const [dashboardFilter, setDashboardFilter] = useState<number>(1);

  // Function to update the dashboard filter
  const updateDashboardFilter = (filterName: number) => {
    setDashboardFilter(filterName);
  };

  return (
    <DashboardContext.Provider value={{ dashboardFilter, updateDashboardFilter }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to access the dashboard context
export function useDashboardContext(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
}
