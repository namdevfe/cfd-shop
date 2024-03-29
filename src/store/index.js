import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "@/constants/environments";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: ENV === "development",
});

export default store;
