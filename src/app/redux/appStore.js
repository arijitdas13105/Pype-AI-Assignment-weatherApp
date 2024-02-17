import  weatherReducer  from "./weatherSlice";

const { configureStore } = require("@reduxjs/toolkit");

const appStore=configureStore({
    reducer:{
        weather:weatherReducer
    }
})

export default appStore;