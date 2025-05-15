import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import apiClient from '@/lib/ApiClient';
import { StreetMapResponse } from '@/types/interfaces/weather-interfaces';

interface LocationContextProps {
    location: string;
    geoDenied: boolean;
    isLoadingLocation: boolean;
}

const LocationContext = createContext<LocationContextProps>({
    location: 'Loading...',
    geoDenied: false,
    isLoadingLocation: true,
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<string>('Loading...');
    const [geoDenied, setGeoDenied] = useState<boolean>(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((permissionStatus) => {
            if (permissionStatus.state === 'granted') {
                navigator.geolocation.getCurrentPosition(success, handleGeoError);
            } else if (permissionStatus.state === 'prompt') {
                navigator.geolocation.getCurrentPosition(success, handleGeoError);
            }
        });
    }, []);

    function handleGeoError() {
        setGeoDenied(true);
        setLocation('Location access denied');
        setIsLoadingLocation(false);
    }

    function success(position: GeolocationPosition) {
        const { latitude, longitude } = position.coords;

        apiClient
            .get<StreetMapResponse>(`http://127.0.0.1:8000/location?lat=${latitude}&lon=${longitude}`)
            .then((res) => {
                const city = res.address.town || res.address.municipality || res.address.county || '';
                const country = res.address.country || '';
                setLocation(`${city}, ${country}`.trim());
                setGeoDenied(false);
            })
            .catch(() => {
                setLocation('Unknown Location');
                setGeoDenied(true);
            })
            .finally(() => setIsLoadingLocation(false));
    }

    return (
        <LocationContext.Provider value={{ location, geoDenied, isLoadingLocation }}>
            {children}
        </LocationContext.Provider>
    );
};
