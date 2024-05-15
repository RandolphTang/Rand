import { fetchWeatherApi } from 'openmeteo';
import {getCoordinatesForCity} from './Location'

export async function fetchWeatherDataByCoor(latitudeInput: any, longitudeInput: any) {

    const params = {
        "latitude": latitudeInput,
        "longitude": longitudeInput,
        "current": "is_day",

        "hourly": ["temperature_2m", "relative_humidity_2m", "rain", "snowfall", "weather_code", "cloud_cover_mid", "visibility", "wind_speed_10m"],
        "daily": ["sunrise", "sunset"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "timezone": "auto",
        "forecast_days": 1
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step},  (_, i) => start + i * step);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            isDay: current.variables(0)!.value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
            rain: hourly.variables(2)!.valuesArray()!,
            snowfall: hourly.variables(3)!.valuesArray()!,
            weatherCode: hourly.variables(4)!.valuesArray()!,
            cloudCoverMid: hourly.variables(5)!.valuesArray()!,
            visibility: hourly.variables(6)!.valuesArray()!,
            windSpeed10m: hourly.variables(7)!.valuesArray()!,
        },

    };


    //
    // for (let i = 0; i < weatherData.hourly.time.length; i++) {
    //     console.log(
    //         weatherData.current.isDay,
    //
    //     );
    // }


    return weatherData;

}