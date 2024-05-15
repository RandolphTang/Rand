import React, {useEffect, useState} from "react";
import '../CSS/display.css';
import {FaEye, FaSearch, FaThermometerHalf, FaTint} from "react-icons/fa";
import CubeComponent from './cube';
import {fetchWeatherData} from "./Weather.ts";
import {fetchWeatherDataByCoor} from "./WeatherByCoor.ts";
import WMOJsonCode from '../WMOJsonCode.json'
import { FaSun, FaCloudRain, FaSnowflake, FaSmog, FaWind, FaCloud } from 'react-icons/fa';
import { WiHumidity } from "react-icons/wi";
import RainImg from '../Data/Image/rain.gif';
import SnowImg from '../Data/Image/snow.gif';
import SunnyImg from '../Data/Image/grassland3.gif';
import { IoLocation } from "react-icons/io5";
export default function Display() {
    const [inputCity, setInputCity] = useState('');
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchWeather = async () => {
        if (!inputCity) {
            alert("Please enter a city name.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const data = await fetchWeatherData(city);
            setWeatherData(data);
            setCity(inputCity);
        } catch (err) {
            setError("Failed to fetch weather data.");
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };
    const getWeatherIcon = (code) => {


        const timeOfDay = weatherData.current.isDay === 1 ? 'day' : 'night';

        if (WMOJsonCode[code] && WMOJsonCode[code][timeOfDay]) {

            const iconData = WMOJsonCode[code][timeOfDay];
            return (
                <img src={iconData.image} alt={iconData.description} style={{ width: '50px', height: '50px' }} />
            );
        } else {
            return <span>No Icon Available</span>;
        }

    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Assuming you have a function to fetch weather by coordinates
                const data = await fetchWeatherDataByCoor(lat, lon);
                setWeatherData(data);
                setCity('here');
            }, () => {
                setError('Failed to access your location.');
            });
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    useEffect(() => {
        if (weatherData && weatherData.current) {
            const rain = weatherData.hourly.rain[0];
            const snow = weatherData.hourly.snowfall[0];

            if (rain[0] > 0) {
                document.querySelector('.weatherDisplay').style.backgroundImage = `url(${RainImg})`;
            } else if (snow[0] > 5) {
                document.querySelector('.weatherDisplay').style.backgroundImage = `url(${SnowImg})`;
            } else {
                console.log("here")
                document.querySelector('.weatherDisplay').style.backgroundImage = `url(${SunnyImg})`;
            }

            document.querySelector('.weatherDisplay').style.backgroundSize = 'cover';
        }
    }, [weatherData]);


    return (
        <div className='weatherDisplay'>
            <div className="weatherInfo">
                <input
                    type="text"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    placeholder="Enter city name"
                    className="city-input"
                />
                <button onClick={handleFetchWeather} className="submit-button"><FaSearch/></button>
                <button onClick={handleLocation} className="submit-button"><IoLocation /></button>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            <div className='weatherInfoDisPlay'>
                {weatherData && (
                    <div className="weatherDataContainer">
                        <div className="weatherDetails">
                            <span><FaThermometerHalf/> {weatherData.hourly.temperature2m[0].toFixed(2)}°F</span>
                            <span>{getWeatherIcon(weatherData.hourly.weatherCode[0])}</span>
                            <h1>{city}</h1>
                            <span><WiHumidity/> {weatherData.hourly.relativeHumidity2m[0]}%</span>
                            <span><FaWind/> {weatherData.hourly.windSpeed10m[0].toFixed(2)}km/h</span>
                        </div>
                    </div>
                )}
            </div>
            <CubeComponent/>
        </div>
    )
}