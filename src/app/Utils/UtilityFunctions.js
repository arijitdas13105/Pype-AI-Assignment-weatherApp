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
  