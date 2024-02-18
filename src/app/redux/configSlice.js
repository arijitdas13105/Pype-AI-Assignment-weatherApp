const { createSlice } = require("@reduxjs/toolkit");

const  configSlice=createSlice({
    name:'config',
    initialState:{
        meter:'c'
    },
    reducers:{
        changeMeter:(state,action)=>{
                state.meter=action.payload
        }
    }
})