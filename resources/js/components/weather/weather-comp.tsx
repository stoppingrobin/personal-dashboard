import { useEffect, useMemo, useState } from 'react';
import { WeatherBlock, WeatherResponse } from '@/types/interfaces/weather';
import { WeatherCard } from '@/components/weather/subcomponents/weather-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocation } from '@/hooks/context/location-context';
import DateArrow from '@/components/ui/weather/date-arrow';

export default function WeatherComp() {
    const { location, geoDenied, isLoadingLocation } = useLocation();
    const [weatherBlocks, setWeatherBlocks] = useState<WeatherBlock[]>([]);
    const [dayOffset, setDayOffset] = useState<number>(0);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    useEffect(() => {
        if (geoDenied) return;
        navigator.geolocation.getCurrentPosition(success, () => {});
    }, [dayOffset]);

    function success(position: GeolocationPosition) {
        const { latitude, longitude } = position.coords;
        setIsLoadingWeather(true);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`API error: ${res.status}`);
                }
                return res.json();
            })
            .then((res: WeatherResponse) => {
                const now = new Date();
                const targetDate = new Date(now.getTime() + dayOffset * 86400000);
                const targetDateStr = targetDate.toISOString().split('T')[0];
                const currentHour = now.getHours();

                const blocks = res.hourly.time
                    .map((time, index) => {
                        const [date, hour] = time.split('T');
                        const hourNumber = parseInt(hour.slice(0, 2));

                        if (date === targetDateStr) {
                            if (dayOffset === 0 && hourNumber < currentHour) {
                                return null;
                            }
                            return {
                                hour: hour.slice(0, 5),
                                temperature: res.hourly.temperature_2m[index],
                                windSpeed: res.hourly.wind_speed_10m[index],
                                weatherCode: res.hourly.weather_code[index],
                            };
                        }
                        return null;
                    })
                    .filter((block): block is WeatherBlock => block !== null)
                    .filter((_, index) => index % 2 === 0)
                    .slice(0, 12);

                setWeatherBlocks(blocks);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoadingWeather(false));

    }

    const formattedDayLabel = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    }, [dayOffset]);

    return (
        <div className="w-full max-w-5xl mx-auto p-4 h-full flex flex-col justify-between items-left no-scrollbar">
            {geoDenied ? (
                <div className="text-red-500 font-medium">
                    Please allow location access in your browser settings to display the weather forecast.
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            {isLoadingLocation ? <Skeleton/> : <h2 className="text-xl font-semibold">{location}</h2>}
                            <p className="text-sm text-gray-400">{formattedDayLabel}</p>
                        </div>
                        <div className="flex space-x-2">
                            <DateArrow direction="left" className="disabled:opacity-30" disabled={dayOffset === 0}
                                       onClick={() => setDayOffset(dayOffset - 1)}/>
                            <DateArrow direction="right"  onClick={() => setDayOffset(dayOffset + 1)}/>

                        </div>
                    </div>

                    {isLoadingWeather ? <Skeleton /> : (
                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {weatherBlocks.length === 0 ? (
                                <div className="text-gray-400">No forecast data available for this day.</div>
                            ) : (
                                <WeatherCard weatherBlocks={weatherBlocks} />
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}