import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./slices/Slice";

const store = configureStore({
  reducer: {
    cart: SliceReducer
  }
});

export default store;