import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./menuSlice";

const store = configureStore({
  reducer: {
    cart: foodReducer,
  },
});

export default store;
