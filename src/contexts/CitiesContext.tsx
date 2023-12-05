import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from "react";
import axios from "axios";

import { City } from "types/city.types";
import { ROUTES } from "constants/components/routes.constants";

type CitiesContextModel = {
  cities: City[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  currentCity: City | undefined;
  setCurrentCity: Dispatch<SetStateAction<City | undefined>>;
  isLoading: boolean;
};

type CitiesContextProviderProps = {
  children: ReactNode;
};

const BASE_URL = "http://localhost:8000/";

export const CitiesContext = createContext({} as CitiesContextModel);

const CitiesContextProvider = ({ children }: CitiesContextProviderProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCities = async () => {
    const res = await axios.get(`${BASE_URL}${ROUTES.CITIES}`);
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
    setIsLoading,
    currentCity,
    setCurrentCity,
    isLoading
  };

  return (
    <CitiesContext.Provider value={providerValue}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesContextProvider;
