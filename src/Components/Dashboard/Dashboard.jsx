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
// import {
//   clearDay,
//   clearDaySvg,
//   clearNight,
//   clearNightSvg,
//   cloudyDay,
//   cloudyDaySvg,
//   cloudyNight,
//   cloudyNightSvg,
//   rainyDay,
//   rainyNight,
//   rainySvg,
//   snowSvg,
//   thunderstromSvg,
// } from "../../lib/data";

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

  const clearDay =
    "https://res.cloudinary.com/dhwvpqguu/image/upload/v1714134045/weather-app/sunny_sfiuog.jpg";

  const clearNight =
    "https://res.cloudinary.com/dhwvpqguu/image/upload/v1714212829/weather-app/night-clearr_siwpv7.png";

  const rainyDay =
    "https://res.cloudinary.com/dhwvpqguu/image/upload/v1714134074/weather-app/rainy_pa6xy8.jpg";
  const rainyNight =
    "https://res.cloudinary.com/dhwvpqguu/image/upload/v1714134161/weather-app/night-rainy_trky4c.jpg";

  const cloudyDay =
    "https://res.cloudinary.com/dhwvpqguu/image/upload/v1714283041/weather-app/cloud-day_y8w2io.jpg";
  const cloudyNight =
    "https://res.cloudinary.com/dhwvpqguu/image/upload/v1714283055/weather-app/cloud-night_oeobmx.jpg";

  const clearDaySvg = "./assets/icons/day.svg";
  const clearNightSvg = "./assets/icons/night.svg";
  const rainySvg = "./assets/icons/rainy-7.svg";
  const cloudyNightSvg = "./assets/icons/partiallt-cloudy-night.svg";
  const cloudyDaySvg = "./assets/icons/partiallt-cloudy-day.svg";
  const thunderstromSvg = "./assets/icons/thunder.svg";
  const snowSvg = "./assets/icons/snow.svg";

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

  // useEffect(() => {
  //   if (weatherData) {
  //     const weatherCondition = weatherData?.weather[0]?.description;
  //     console.log(weatherCondition);
  //     if (weatherCondition == "clear sky" || "Haze") {
  //       setIsClear(true);
  //     } else if (
  //       weatherCondition == "smoke" ||
  //       "few clouds" ||
  //       "scattered clouds" ||
  //       "broken clouds"
  //     ) {
  //       console.log("object");
  //       setIsCloud(true);
  //     } else if (weatherCondition == "shower rain" || "shower rain") {
  //       setIsRainy(true);
  //     } else if (weatherCondition == "thunderstorm") {
  //       setIsThunder(true);
  //     } else if (weatherCondition == "snow") {
  //       setIsSnow(true);
  //     } else {
  //       setIsClear(true);
  //     }
  //   }
  // }, [weatherData]);

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
    // setIsLoading(true);

    // const handleFetchWeather = async (city_name) => {
    //   try {
    //     setIsLoading(true);
    //     const weatherResponse = await fetchWeatherDetails(city_name);
    //     // return weatherResponse;
    //     setWeatherData(weatherResponse);
    //     setIsLoading(false);
    //   } catch (err) {
    //     setIsLoading(false);
    //     console.log(err);
    //   }
    // };

    // if (cityName) {
    //   handleFetchWeather(cityName);
    // }

    if (weatherData) {
      const weatherCondition = weatherData?.weather[0]?.description;
      console.log(weatherCondition, "weatherCondition");
      const cloudyWeather = weatherData?.weather[0]?.main;
      console.log(checkForCloud(cloudyWeather));
      if (weatherCondition === "clear sky" || weatherCondition === "haze") {
        console.log("iiiiiobject");
        setIsClear(true);
      } else if (checkForCloud(cloudyWeather)) {
        console.log("object");
        setIsClear(false);
        setIsCloud(true);
      } else if (
        weatherCondition === "shower rain" ||
        weatherCondition === "rain"
      ) {
        setIsRainy(true);
      } else if (weatherCondition === "thunderstorm") {
        setIsThunder(true);
      } else if (weatherCondition === "snow") {
        setIsSnow(true);
      } else {
        setIsClear(false);
      }
      // setIsLoading(false);
    }
  }, [weatherData, ]);

  console.log(isClear, "isCLear");

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
                  backgroundImage: `url(${
                    isDay && isClear
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
                      : ""
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
                        className={`text-md lg:text-3xl flex gap-4 ${
                          isDay ? "text-black" : "text-white"
                        }`}
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
                        className={`flex gap-4 lg:gap-0 justify-between text-md lg:text-2xl ${
                          isDay ? "text-black" : "text-white"
                        }`}
                      >
                        {weatherData?.main?.temp_max ==
                        weatherData?.main?.temp_min ? (
                          <>
                            <h5>
                              High:
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_max)
                              )}
                              °C
                            </h5>
                            <h5>
                              Low:
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_min)
                              ) - 14}
                              °C
                            </h5>
                          </>
                        ) : (
                          <>
                            <h5>
                              High:
                              {customRound(
                                kelvinToCelsius(weatherData?.main?.temp_max)
                              )}
                              °C
                            </h5>
                            <h5>
                              Low:
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
                        className={`text-md lg:text-3xl mt-0 lg:mt-16 ${
                          isDay ? "text-black" : "text-white"
                        }`}
                      >
                        {capitalizeWords(weatherData?.weather[0]?.description)}
                        <h5
                          className={`text-md lg:text-2xl mt-1 lg:mt-8 ${
                            isDay ? "text-black" : "text-white"
                          }`}
                        >
                          Feels like
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
