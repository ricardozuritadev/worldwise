import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export const useCities = () => {
  const contextValue = useContext(CitiesContext);

  if (Object.entries(contextValue).length === 0) {
    throw new Error(
      "useCities must be called from whitin an CitiesContextProvider"
    );
  }

  return contextValue;
};
