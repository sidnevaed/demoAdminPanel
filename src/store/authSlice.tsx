import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/Interfaces";

const initialAuthState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "authorization",
  initialState: initialAuthState,

  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
