import { useEffect, useState } from 'react';
import apiClient from '@/lib/ApiClient';

interface WeatherHourlyData {
    time: string[];
    temperature_2m: number[];
}

interface WeatherResponse {
    latitude: number;
    longitude: number;
    elevation: number;
    timezone: string;
    hourly: WeatherHourlyData;
    hourly_units: {
        temperature_2m: string;
    };
}

interface WeatherBlock {
    hour: string;
    temperature: number;
}
interface StreetMapResponse{
    address : {
        city : string,
        town : string,
        village : string,
        country : string
    }
}

export default function WeatherComp() {
    const [weatherBlocks, setWeatherBlocks] = useState<WeatherBlock[]>([]);
    const [locationName, setLocationName] = useState<string>('Loading...');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);


    function success(position: GeolocationPosition) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        apiClient.get<StreetMapResponse>(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => {
                const city = res.address.city || res.address.town || res.address.village || '';
                const country = res.address.country || '';
                setLocationName(`${city}, ${country}`.trim());
            })
            .catch(err => {
                console.error(err);
                setLocationName('Unknown Location');
            });

        apiClient
            .get<WeatherResponse>(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
            )
            .then((res) => {
                const blocks = res.hourly.time
                    .map((time, index) => ({
                        hour: time.slice(11),
                        temperature: res.hourly.temperature_2m[index],
                    }))
                    .filter((_, index) => index % 2 === 0)
                    .slice(0, 12);

                setWeatherBlocks(blocks);
            })
            .catch((err) => console.error(err));
    }
    function error() {
        console.log("Unable to retrieve your location");
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 h-full flex flex-col justify-between items-left no-scrollbar">
            <div>
                <h2 className="text-xl font-semibold mb-1">{locationName}</h2>
                <p className="text-sm text-gray-400 mb-4">Hourly Forecast (2h steps)</p>
            </div>


            <div className="flex overflow-x-auto space-x-4 pb-4">
                {weatherBlocks.map((block, index) => (
                    <div
                        key={index}
                        className="min-w-[80px] flex flex-col items-center justify-center bg-white/10 rounded-xl p-3 text-center shadow-sm border border-white/10"
                    >
                        <div className="text-sm font-medium">{block.hour}</div>
                        <div className="text-2xl">🌤️</div>
                        <div className="text-lg font-bold">{block.temperature}°C</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
