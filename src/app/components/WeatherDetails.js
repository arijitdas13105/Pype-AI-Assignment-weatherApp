import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { kelvinToCelsius } from "../Utils/UtilityFunctions";

const WeatherDetails = () => {
  const weatherr = useSelector((store) => store.weather);
if (!weatherr) {
    return null; // Render nothing if weather data is not available
  }
  return (
    <div className="flex flex-col h-[50%] gap-14 ">
      {/* {Object.keys(searchResults).length > 0 && ( */}
      <>
        <div className="flex gap-10">
          <Icon
            icon="ph:cloud-sun-light"
            width="30"
            height="30"
            style={{ color: "#f2ab31" }}
          />
          <h1>feeels like </h1>
          {/* <h1> {weatherr.feels_like} °</h1> */}
          <h1> {kelvinToCelsius(weatherr.feels_like)}° c</h1>
          {/* <h1>{searchResults && searchResults.main.feels_like}°</h1> */}
          {/* <h1>{searchResults ? searchResults.main.feels_like : 0}°</h1> */}
        </div>
        <div className="flex gap-10">
          <Icon
            icon="mdi:temperature"
            width="30"
            height="30"
            style={{ color: "#ec1818" }}
          />{" "}
          <h1>High temp</h1>
          {/* <h1>{searchResults.main.temp_max}°</h1> */}
          <h1> {kelvinToCelsius(weatherr.high_temp)}° c</h1>
        </div>
        <div className="flex gap-10">
          <Icon
            icon="ph:thermometer-cold-bold"
            width="30"
            height="30"
            style={{ color: " #9935fd" }}
          />{" "}
          <h1>Low temp</h1>
          {/* <h1>{searchResults.main.temp_min}°</h1> */}
          <h1> {kelvinToCelsius(weatherr.low_temp)}° c</h1>

        </div>
        <div className="flex gap-10">
          {/* <h1>icon</h1> */}
          <Icon
            icon="material-symbols:humidity-mid"
            width="30"
            height="30"
            style={{ color: "#31a8f2" }}
          />
          <h1>Humidity</h1>
          {/* <h1>{searchResults.main.humidity}°</h1> */}
          <h1> {weatherr.humidity}%</h1>

        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default WeatherDetails;
