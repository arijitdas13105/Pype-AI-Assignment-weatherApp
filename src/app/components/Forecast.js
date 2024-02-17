import React from 'react'
import { useSelector } from 'react-redux';
import { kelvinToCelsius } from "../Utils/UtilityFunctions";

const Forecast = () => {
    const forecastData = useSelector(state => state.weather.foreCast);
    console.log(forecastData);
  return (
    <div className="h-[25%] flex  gap-5 ">
    {forecastData.map((forecast, index) => (
      <div
        key={index}
        className=" h-[100px] w-[80px] rounded-md  border justify-center items-center flex flex-col font-sans "
      >
        <h3 className=" text-[12px]">
          {new Date(forecast.forecast_dt * 1000).toLocaleDateString(
            "en-US",
            { weekday: "long" }
          )}
        </h3>
        <h3 className="text-xl">  {kelvinToCelsius(forecast.temp_max)}° </h3>
        <h3 className="text-[7px]">
          {forecast.description}
          {/* {forecast.temp_max} */}
        </h3>
      </div>
    ))}
  </div>
  )
}

export default Forecast