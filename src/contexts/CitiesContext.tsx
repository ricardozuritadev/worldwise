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
  currentCity: City | undefined;
  setCurrentCity: Dispatch<SetStateAction<City | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  createCity: (newCity: City) => Promise<void>;
  deleteCity: (id: number) => void;
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

  async function getCities() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}${ROUTES.CITIES}`);
      setCities(data);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: City) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}${ROUTES.CITIES}/`,
        newCity
      );
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error creating city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: number) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}${ROUTES.CITIES}/${id}`);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("There was an error deleting city...");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  const providerValue = {
    cities,
    currentCity,
    setCurrentCity,
    isLoading,
    setIsLoading,
    createCity,
    deleteCity
  };

  return (
    <CitiesContext.Provider value={providerValue}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesContextProvider;
