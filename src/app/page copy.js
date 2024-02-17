"use client";
import Image from "next/image";
import { API_KEY } from "./utils.js";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forecast, weatherDetails, weatherInput } from "./redux/weatherSlice.js";

export default function Home() {
  const dispatch=useDispatch()
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nextResults, setNextResults] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date());

  const weatherr=useSelector((store)=>store.weather)
  const forecastData = useSelector(state => state.weather.foreCast);
if(!forecastData){
  return
}
  console.log('Forecast Data:', forecastData);
    const memoizedWeather = useMemo(() => weatherr, [weatherr]);

  // console.log("weathee",weatherr)
  // console.log("forecast",forecast)
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

  // useEffect(() => {
  //   fetchSearchResults();
  // }, [API_KEY]);
  // useEffect(() => {
  //   // console.log(searchResults);
  // }, [searchResults]);

  useEffect(() => {
    fetchSearchResults();
  }, []); // Watch for changes in searchText instead of API_KEY

  // useEffect(() => {
  //   if (searchText.trim() !== "") {
  //     fetchSearchResults();
  //   }
  // }, [searchText]);
  
  const searchCity = async ({ lat, lon }) => {
    console.log("weatherr.lat",weatherr.lat);
    console.log("weatherr.lat",weatherr.lon);
    try {
      const response = await fetch(
        // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        `https://api.openweathermap.org/data/2.5/weather?lat=${weatherr.lat}&lon=${weatherr.lon}&appid=${API_KEY}`
        // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log("data is data",data);
      const high_temp=data.main.temp_max
      const low_temp=data.main.temp_min
      const humidity=data.main.humidity
      const feels_like=data.main.feels_like
      const LocationName=data.name
      dispatch(weatherDetails({high_temp,low_temp,humidity,feels_like,LocationName}))
      // setSearchResults(data);
      // console.log("searchResults=>", searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const nextDays = async ({ lat, lon }) => {
    try {
      const response = await fetch(
        // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherr.lat}&lon=${weatherr.lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      // setNextResults(data.list.slice(8));
      console.log("nextResults1=>", data.list);

      // Filter the data to include only one entry per date
      const filteredData = filterDataByDate(data.list);
      console.log("filtered",filteredData)

      const specificData= filteredData.map((item)=>({
        temp:item.main.temp,
        feels_like: item.main.feels_like,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        forecast_dt:item.dt,
        description:item.weather[0].description
      }))
      console.log(specificData);
      dispatch(forecast(specificData))
      // setNextResults(filteredData);
      // console.log("nextResults2=>", nextResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const filterDataByDate = (dataList) => {
    const filteredData = [];
    const dates = {};

    for (const entry of dataList) {
      const date = entry.dt_txt.split(" ")[0];
      console.log("date", date); // 2024-02-20

      if (!dates[date]) {
        dates[date] = true;
        console.log("entry", entry);
        filteredData.push(entry);
      }
    }

    return filteredData;
  };

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();

      // console.log(data[0].lat);
      if(data){
        const lat = data[0].lat;
        const lon = data[0].lon;
      
      dispatch(weatherInput({lat,lon}))
      searchCity({ lat, lon });
      nextDays({ lat, lon });
      }
     
      // console.log(data);
        
      // searchCity();
      // nextDays();
      // nextDays({ lat, lon })
      // setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      //
    }
  };

  const handleSearch = () => {
    // This function is not needed with useEffect
  };

  return (
    <div className=" flex justify-center  items-center  h-[100vh]   bg-[#EBEBEB]  ">
      <div className="border bg-[#FAFAFA] w-[900px] h-[600px] border-red flex flex-row  ">
        <div className="w-[70%]">
          <div className="h-[20%] flex justify-center items-center  px-3 ">
            <input
              className="p-2 flex-grow mr-4 border border-red-700 rounded-md"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter a city"
            />
            <button
              className="px-4 py-2 border border-black text-blue-900 bg-white rounded-md hover:bg-gray-200 transition duration-300"
              onClick={fetchSearchResults}
            >
              Search
            </button>
          </div>
          {/* {Object.keys(searchResults).length > 0 && ( */}
            <>
              <div className="h-[55%] border-black bg-[#f7eaea] text-center  flex justify-center items-center flex-col gap-6">
                <h1 className="  font-bold text-7xl">
                  {weatherr.feels_like}°
                </h1>
                {/* <h3 className="  font-bold text-2xl">cloudy</h3> */}
                <h3 className="  font-bold text-2xl">{weatherr.LocationName}</h3>
              </div>

{/* <h1> {forecastData[0].feels_like} </h1> */}
              <div className="h-[25%] flex  gap-5">
                {forecastData.map((forecast, index) => (
                  <div
                    key={index}
                    className=" h-[100px] w-[80px] border justify-center items-center flex flex-col font-sans "
                  >
                    <h3 className=" text-[12px]">
                      {new Date(forecast.forecast_dt * 1000).toLocaleDateString(
                        "en-US",
                        { weekday: "long" }
                      )}
                    </h3>
                    <h3 className="text-xl"> {forecast.temp_max}°</h3>
                    <h3 className="text-[7px]">
                      {forecast.description}
                      {/* {forecast.temp_max} */}
                    </h3>
                  </div>
                ))}
              </div>
            </>
          {/* )} */}
        </div>

        <div className="flex-1 border border-black bg-[#f7eaea] flex flex-col justify-center items-center">
          <div className="h-[50%] py-8 text-center gap-4 ">
            <h1 className="font-bold text-3xl">{getGreeting()}</h1>
            {/* <h2>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h2> */}
            <h2>{currentTime.toLocaleTimeString()}</h2>
          </div>

          <div className="flex flex-col h-[50%] gap-14 ">
            {/* {Object.keys(searchResults).length > 0 && ( */}
              <>
                <div className="flex gap-10">
                  <h1>icon</h1>
                  <h1>Feels Like</h1>
                  {/* <h1> {searchResults.main.feels_like} °</h1> */}
                  <h1> {weatherr.feels_like} °</h1>
                  {/* <h1>{searchResults && searchResults.main.feels_like}°</h1> */}
                  {/* <h1>{searchResults ? searchResults.main.feels_like : 0}°</h1> */}
                </div>
                <div className="flex gap-10">
                  <h1>icon</h1>
                  <h1>High temp</h1>
                  {/* <h1>{searchResults.main.temp_max}°</h1> */}
                  <h1> {weatherr.high_temp} °</h1>

                </div>
                <div className="flex gap-10">
                  <h1>icon</h1>
                  <h1>Low temp</h1>
                  {/* <h1>{searchResults.main.temp_min}°</h1> */}
                  <h1> {weatherr.low_temp} °</h1>

                </div>
                <div className="flex gap-10">
                  <h1>icon</h1>
                  <h1>Humidity</h1>
                  {/* <h1>{searchResults.main.humidity}°</h1> */}
                  <h1> {weatherr.humidity} °</h1>

                </div>
              </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
