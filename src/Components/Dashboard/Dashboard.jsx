import React, { useEffect, useState } from "react";
import kelvinToCelsius, {
  capitalizeWords,
  checkForCloud,
  customRound,
} from "../../lib/helperFunction";
import WeatherCard from "../WeatherCard/WeatherCard";
import Search from "../Search/Search";
import { useLocationData } from "../../lib/locationData";
import {
  fetchWeatherDetails,
  fetchWeatherWithLocation,
} from "../../lib/fetchApi";
import Loader from "../Loader/Loader";
import {
  clearDay,
  clearDaySvg,
  clearNight,
  clearNightSvg,
  cloudyDay,
  cloudyDaySvg,
  cloudyNight,
  cloudyNightSvg,
  rainyDay,
  rainyNight,
  rainySvg,
  snowSvg,
  thunderstromSvg,
} from "../../lib/data";

const Dashboard = () => {
  const { locationData } = useLocationData();
  const [weatherData, setWeatherData] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [isRainy, setIsRainy] = useState(false);
  const [isCloud, setIsCloud] = useState(false);
  const [isSnow, setIsSnow] = useState(false);
  const [isThunder, setIsThunder] = useState(false);
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //setting day or night
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      // Check if it's 6:00 PM IST
      if ((hours >= 18 && hours <= 23) || (hours >= 0 && hours <= 6)) {
        setIsDay(false);
      } else {
        setIsDay(true);
      }
    };

    const interval = setInterval(checkTime, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

// fetch weather to current location
  const handleFetchLocationWeather = async (data) => {
    try {
      setIsLoading(true);
      const loactionWeather = await fetchWeatherWithLocation(data);
      setWeatherData(loactionWeather);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  //fetch current location
  useEffect(() => {
    if (!locationData?.latitude && !locationData?.longitude) {
      const payload = {
        lattitude: 28.6129,
        longitude: 77.2295,
      };
      handleFetchLocationWeather(payload);
    } else {
      const payload = {
        lattitude: locationData?.latitude,
        longitude: locationData?.longitude,
      };
      handleFetchLocationWeather(payload);
    }
  }, [locationData]);

  //fetch weather with city
  const handleFetchWeather = async (city_name) => {
    try {
      setIsLoading(true);
      const weatherResponse = await fetchWeatherDetails(city_name);
      setWeatherData(weatherResponse);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (cityName) {
      handleFetchWeather(cityName);
    }
  }, [cityName]);

  useEffect(() => {
    setIsLoading(true);

    if (weatherData) {
      const weatherCondition = weatherData?.weather[0]?.description;
      console.log(weatherCondition, "weatherCondition");
      const cloudyWeather = weatherData?.weather[0]?.main;
      console.log(checkForCloud(cloudyWeather));
      if (weatherCondition === "clear sky" || weatherCondition === "haze") {
        setIsClear(true);
        setIsCloud(false)
        setIsRainy(false)
        setIsThunder(false)
        setIsSnow(false)
      } else if (checkForCloud(cloudyWeather)) {
        setIsClear(false);
        setIsCloud(true);
        setIsRainy(false)
        setIsThunder(false)
        setIsSnow(false)
      } else if (
        weatherCondition === "shower rain" ||
        weatherCondition === "rain"
      ) {
        setIsRainy(true);
        setIsClear(false);
        setIsCloud(false)
        setIsThunder(false)
        setIsSnow(false)
      } else if (weatherCondition === "thunderstorm") {
        setIsThunder(true);
        setIsClear(false);
        setIsCloud(false)
        setIsRainy(false)
        setIsSnow(false)
      } else if (weatherCondition === "snow") {
        setIsSnow(true);
        setIsThunder(false);
        setIsClear(false);
        setIsCloud(false)
        setIsRainy(false)
      }
      setIsLoading(false);
    }
  }, [weatherData, isLoading]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {weatherData && (
            <>
              <div
                style={{
                  backgroundImage: `url(${isDay && isClear
                    ? clearDay
                    : isDay && (isRainy || isSnow)
                      ? rainyDay
                      : !isDay && isClear
                        ? clearNight
                        : !isDay && (isRainy || isSnow)
                          ? rainyNight
                          : isDay && (isCloud || isThunder)
                            ? cloudyDay
                            : !isDay && (isCloud || isThunder)
                              ? cloudyNight
                              : isClear
                    }
)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <Search setCityName={setCityName} />

                <div className="px-4 lg:px-8 mt-32 lg:mt-16">
                  <div className="flex justify-between">
                    <div className="px-2 lg:px-10">
                      <h2
                        className={`text-md lg:text-3xl flex gap-4 ${isDay ? "text-black" : "text-white"}`}
                      >
                        {weatherData?.name}
                      </h2>
                      <div className="flex">
                        <div className="text-4xl lg:text-6xl text-white flex items-center">
                          {customRound(
                            kelvinToCelsius(weatherData?.main?.temp)
                          )}
                          °C
                        </div>
                        <div>
                          <img
                            src={
                              isDay && isClear
                                ? clearDaySvg
                                : !isDay && isClear
                                  ? clearNightSvg
                                  : isRainy
                                    ? rainySvg
                                    : isDay && isCloud
                                      ? cloudyDaySvg
                                      : !isDay && isCloud
                                        ? cloudyNightSvg
                                        : isThunder
                                          ? thunderstromSvg
                                          : isSnow
                                            ? snowSvg
                                            : clearDaySvg
                            }
                            alt=""
                            className="w-20 lg:w-40"
                          />
                        </div>
                      </div>
                      <div
                        className={`flex gap-4 lg:gap-0 justify-between text-md lg:text-2xl ${isDay ? "text-black" : "text-white"}`}
                      >
                        {weatherData?.main?.temp_max ==
                          weatherData?.main?.temp_min ? (
                          <>
                            <h5>
                              High:{' '}
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_max)
                              )}
                              °C
                            </h5>
                            <h5>
                              Low:{' '}
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_min)
                              ) - 14}
                              °C
                            </h5>
                          </>
                        ) : (
                          <>
                            <h5>
                              High:{' '}
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_max)
                              )}
                              °C
                            </h5>
                            <h5>
                              Low:{' '}
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_min)
                              )}
                              °C
                            </h5>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="px-2 lg:px-10 flex lg:block items-end">
                      <h2
                        className={`text-md lg:text-3xl mt-0 lg:mt-16 ${isDay ? "text-black" : "text-white"}`}
                      >
                        {capitalizeWords(weatherData?.weather[0]?.description)}
                        <h5
                          className={`text-md lg:text-2xl mt-1 lg:mt-8 ${isDay ? "text-black" : "text-white"}`}
                        >
                          Feels like{' '}
                          {customRound(
                            kelvinToCelsius(weatherData?.main?.feels_like)
                          )}
                          °C
                        </h5>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <WeatherCard weatherData={weatherData} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
