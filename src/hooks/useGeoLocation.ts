import { useState } from "react";

import { GENERAL } from "constants/general.constants";

type Position = {
  lat: number;
  lng: number;
};

export const useGeolocation = (defaultPosition: Position | null = null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation) return setError(GENERAL.NO_GEOLOCATION_SUPPORT);

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, position, error, getPosition };
};
