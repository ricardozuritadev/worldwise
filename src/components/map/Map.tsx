import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCities } from 'hooks/useCities';
import { useGeolocation } from 'hooks/useGeoLocation';
import { useUrlPosition } from 'hooks/useUrlPosition';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from 'react-leaflet';

import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import Button from 'components/button';
import { ButtonType } from 'types/button.types';

const Map = () => {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat != 0 && mapLng != 0) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={ButtonType.Position} onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(({ id, position, emoji, cityName }) => (
          <Marker position={position} key={id}>
            <Popup>
              <span>{emoji}</span>
              <span>{cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

type ChangeCenterProps = {
  position: LatLngExpression;
};

const ChangeCenter = ({ position }: ChangeCenterProps) => {
  const map = useMap();
  map.setView(position);

  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      navigate(`form?lat=${e.latlng.lat}&long=${e.latlng.lng}`);
    }
  });

  return null;
};

export default Map;
