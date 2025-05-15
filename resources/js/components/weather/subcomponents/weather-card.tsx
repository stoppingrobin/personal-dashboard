import { WeatherBlock, weatherCodeMap } from '@/types/interfaces/weather-interfaces';

interface WeatherForecastListProps {
    weatherBlocks: WeatherBlock[];
}


export function WeatherCard({ weatherBlocks }: WeatherForecastListProps) {

    function getWeatherInfo(code: number): { emoji: string; description: string } {
        return weatherCodeMap[code] ?? { emoji: "❓", description: "Unknown weather code" };
    }

    if (!weatherBlocks || weatherBlocks.length === 0) {
        return <div className="text-gray-400">No forecast data available for this day.</div>;
    }

    return (
        <div className="flex overflow-x-auto space-x-4 pb-4">
            {weatherBlocks.map((block, index) => (
                <div
                    key={index}
                    className="min-w-[80px] flex flex-col items-center justify-center bg-white/10 rounded-xl p-3 text-center shadow-sm border border-white/10"
                >
                    <div className="text-sm font-medium">{block.hour}</div>
                    <div className="text-2xl">{getWeatherInfo(block.weatherCode).emoji}</div>
                    <div className="text-lg font-bold">{block.temperature}°C</div>
                </div>
            ))}
        </div>
    );
}
