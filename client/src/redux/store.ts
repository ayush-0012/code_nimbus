import { configureStore } from "@reduxjs/toolkit";
import containerSlice from "./feature/container/containerSlice";

export const store = configureStore({
  reducer: {
    container: containerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
