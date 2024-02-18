"use client";
import Image from "next/image";
import { API_KEY } from "./utils.js";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forecast,
  weatherDetails,
  weatherInput,
} from "./redux/weatherSlice.js";
import SearchBar from "./components/SearchBar.js";
import Forecast from "./components/Forecast.js";
import WeatherDetails from "./components/WeatherDetails.js";
import {
  kelvinToCelsius,
  kelvinToFahrenheit,
  renderTemperature,
} from "./Utils/UtilityFunctions.js";

export default function Home() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  // const searchText=useRef(null)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temp, setTemp] = useState("celsius");
  const weatherr = useSelector((store) => store.weather);
  const forecastData = useSelector((state) => state.weather.foreCast);
  if (!forecastData) {
    return;
  }
  // console.log('Forecast Data:', forecastData);
  const memoizedWeather = useMemo(() => weatherr, [weatherr]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const changeTemp = () => {
    setTemp(temp === "celsius" ? "Fahrenheit" : "celsius");
  };

  return (
    <div className=" flex justify-center  items-center  h-[100vh]   bg-[#EBEBEB]  ">
      <div className="border bg-[#FAFAFA] w-[900px] h-[600px] border-red flex flex-row  ">
        <div className="w-[70%]">
          <SearchBar />
          {/* {Object.keys(searchResults).length > 0 && ( */}
          <>
            <>
              <div className="h-[55%] border-black bg-[#f7eaea] text-center flex justify-center items-center flex-col gap-6">
                {weatherr.feels_like ? (
                  <>
                    <h1 className="font-bold text-7xl">
                      {/* {Math.floor(kelvinToCelsius(weatherr.feels_like))}° C */}

                      {renderTemperature(Math.floor(weatherr.feels_like), temp)}

                      {/* {Math.floor(renderTemperature(weatherr.feels_like, temp))}° C */}
                    </h1>
                    <h3 className="font-bold text-2xl">
                      {weatherr.LocationName}
                    </h3>
                  </>
                ) : (
                  <>
                    <h1 className=" font-light  text-2xl">Weather App</h1>
                  </>
                )}
              </div>
              {weatherr.feels_like && (
                <button className="mr-auto my-2 text-red-200 font-bold bg-black " onClick={changeTemp}>
                  Click here to see in {""}
                  {temp === "celsius" ? "Fahrenheit" : "Celsius"} 👈
                </button>
              )}

              {/* <span>next 5 days </span> */}
              <Forecast temp={temp} />
            </>

            {/* <Forecast /> */}
          </>
        </div>

        <div className="flex-1 border border-gray-300  rounded-md bg-[#f7eaea] flex flex-col justify-center items-center">
          <div className="h-[50%] py-8 text-center gap-4 ">
            <h1 className="font-bold text-3xl">{getGreeting()}</h1>
            {/* <h2>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h2> */}
            <h2>{currentTime.toLocaleTimeString()}</h2>
          </div>

          <WeatherDetails temp={temp} />
        </div>
      </div>
    </div>
  );
}
