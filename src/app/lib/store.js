import { baseApi } from "./features/baseApi/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer, user: userReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};
