import React from 'react'

import { API_KEY } from "../utils";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { forecast, weatherDetails, weatherInput } from "./redux/weatherSlice.js";
import { forecast, weatherDetails, weatherInput } from "../redux/weatherSlice.js";

const SearchBar = () => {
    const dispatch=useDispatch()
    const [searchText, setSearchText] = useState("");
  // const searchText=useRef(null)
    const [currentTime, setCurrentTime] = useState(new Date());
  
    const weatherr=useSelector((store)=>store.weather)
    const forecastData = useSelector(state => state.weather.foreCast);
  if(!forecastData){
    return
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
  
  
    useEffect(() => {
      fetchSearchResults();
    }, []); // Watch for changes in searchText instead of API_KEY
  
    const fetchSearchResults = async () => {
        try {
          console.log(searchText);
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${API_KEY}`
          );
          const data = await response.json();
    
          // console.log(data[0].lat);
          if(data){
            const lat = data[0].lat;
            const lon = data[0].lon;
          
          dispatch(weatherInput({lat,lon}))
          dispatch(fetchWeatherData(lat, lon))
         
          }
         
        } catch (error) {
          console.error("Error fetching search results:", error);
          //
        }
      };
    
      // Action creator to fetch weather data
    const fetchWeatherData = (lat, lon) => {
      return async (dispatch) => {
        try {
          // Fetch current weather
          const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          const currentData = await currentResponse.json();
    
          const high_temp = currentData.main.temp_max;
          const low_temp = currentData.main.temp_min;
          const humidity = currentData.main.humidity;
          const feels_like = currentData.main.feels_like;
          const LocationName = currentData.name;
    
          dispatch(weatherDetails({ high_temp, low_temp, humidity, feels_like, LocationName }));
    
          // Fetch forecast
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          const forecastData = await forecastResponse.json();
    
          const filteredData = filterDataByDate(forecastData.list);
          const specificData = filteredData.map((item) => ({
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            temp_max: item.main.temp_max,
            temp_min: item.main.temp_min,
            forecast_dt: item.dt,
            description: item.weather[0].description
          }));
    
          dispatch(forecast(specificData));
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
    };

    const filterDataByDate = (dataList) => {
        const filteredData = [];
        const dates = {};
    
        for (const entry of dataList) {
          const date = entry.dt_txt.split(" ")[0];
          // console.log("date", date); 
          // 2024-02-20
    
          if (!dates[date]) {
            dates[date] = true;
            // console.log("entry", entry);
            filteredData.push(entry);
          }
        }
    
        return filteredData;
      };
  return (
    <div className="h-[20%] flex justify-center items-center  px-3 ">
    <input
      className="p-2 flex-grow mr-4 border border-red-700 rounded-md"
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      // ref={searchText}
      placeholder="Enter a city"
    />
    <button
      className="px-4 py-2 border border-black text-blue-900 bg-white rounded-md hover:bg-gray-200 transition duration-300"
      onClick={fetchSearchResults}
    >
      Search
    </button>

    
  </div>  
  )
}

export default SearchBar