import { configureStore } from "@reduxjs/toolkit";
import usersSliceReducer from "./usersSlice";
import authSliceReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    usersLists: usersSliceReducer,
    authorization: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
