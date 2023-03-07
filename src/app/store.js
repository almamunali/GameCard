import { configureStore } from "@reduxjs/toolkit";
import CardsReducer from "../Slice/CardItemSlice"

const store=configureStore({
    reducer:{
        CardDataAll:CardsReducer
    }
})

export default store;