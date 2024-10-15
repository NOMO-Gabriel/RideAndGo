'use client';

import { createContext, ReactNode, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface SearchData {
  isItinerary: boolean;
  place: Location;
  startPoint: Location;
  endPoint: Location;
  cost: number;
}

const polytechYaounde: Location = {
  latitude: 3.8480,
  longitude: 11.5021,
  name: "École Nationale Supérieure Polytechnique de Yaoundé",
};

const posteCentrale: Location = {
  latitude: 3.8662,
  longitude: 11.5160,
  name: "Poste Centrale de Yaoundé",
};
const polytech: Location = {
    latitude: 3.8480,
    longitude: 11.5021,
    name: "École Nationale Supérieure Polytechnique ",
  };

interface SearchFilterContextProps {
  searchData: SearchData;
  updateSearchData: (data: Partial<SearchData>) => void;
}

export const SearchFilterContext = createContext<SearchFilterContextProps | undefined>(undefined);

export const SearchFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    isItinerary: true,
    place: polytech,
    startPoint: polytechYaounde,
    endPoint: posteCentrale,
    cost: 700,
  });

  const updateSearchData = (data: Partial<SearchData>) => {
    setSearchData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <SearchFilterContext.Provider value={{ searchData, updateSearchData }}>
      {children}
    </SearchFilterContext.Provider>
  );
};
