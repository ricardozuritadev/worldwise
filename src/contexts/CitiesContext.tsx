import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

import { City } from "../types/city.types";

type CitiesContextModel = {
  cities: City[];
  isLoading: boolean;
};

type CitiesContextProviderProps = {
  children: ReactNode;
};

export const CitiesContext = createContext({} as CitiesContextModel);

const CitiesContextProvider = ({ children }: CitiesContextProviderProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCities = async () => {
    const res = await axios.get("http://localhost:8000/cities");
    return res.data;
  };

  useEffect(() => {
    setIsLoading(true);
    getCities()
      .then((data) => setCities(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const providerValue = {
    cities,
    isLoading
  };

  return (
    <CitiesContext.Provider value={providerValue}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesContextProvider;
