// export const kelvinToCelsius=(tempInKelvin)=>{
//     return (tempInKelvin-273.15).toFixed(2)
// }


export const kelvinToCelsius = (kelvin) => {
    if (kelvin === null || typeof kelvin === "undefined") {
      return "";
    }
  
    // Convert kelvin to celsius
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  };
  

  export const kelvinToFahrenheit = (kelvin) => {
    if (kelvin === null || typeof kelvin === "undefined") {
      return "";
    }
  
    // Convert kelvin to Fahrenheit
    const fahrenheit = (kelvin - 273.15) * 9/5 + 32;
    return fahrenheit.toFixed(2);
};


export const renderTemperature = (temperature, temp) => {
  if (temp === "celsius") {
      return Math.floor(kelvinToCelsius(temperature)) + "°C";
  } else {
      return Math.floor(kelvinToFahrenheit(temperature)) + "°F";
  }
};

