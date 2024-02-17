const { createSlice } = require("@reduxjs/toolkit");

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    lat: null,
    lon: null,
    high_temp: null,
    low_temp: null,
    humidity: null,
    feels_like: null,
    LocationName:null,
    foreCast:[]
  },
  reducers: {
    weatherInput: (state, action) => {
      const { lat, lon } = action.payload;
      state.lat = lat;
      state.lon = lon;
    },
    weatherDetails: (state, action) => {
      const { high_temp, low_temp, humidity, feels_like,LocationName } = action.payload;
      state.high_temp = high_temp;
      state.low_temp = low_temp;
      state.humidity = humidity;
      state.feels_like = feels_like;
      state.LocationName=LocationName
    },

    forecast: (state, action) => {
        state.foreCast = action.payload;
      }
      
  },
});

export const { weatherInput,weatherDetails,forecast } = weatherSlice.actions;
export default weatherSlice.reducer;
