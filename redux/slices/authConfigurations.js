import { createSlice } from "@reduxjs/toolkit";
import { IsLoggedStatus, NotLoggedStatus } from "../../utils/Constants";

const initialSessionStatus = {
  status: NotLoggedStatus,
  userName: null,
  uid: null,
  email: null,
  photoURL: null,
  errorMessage: null,
};

export const sessionSlice = createSlice({
  name: "sessionDataSlice",
  initialState: {
    sessionStatus: { ...initialSessionStatus },
  },
  reducers: {
    login: (state, { payload }) => {
      state.sessionStatus = {
        status: IsLoggedStatus,
        email: payload.email,
        userName: payload.displayName,
        photoURL: payload.photoURL,
        uid: payload.uid,
        errorMessage: null,
      };
    },
    logout: (state, { payload }) => {
      state.sessionStatus = {
        ...initialSessionStatus,
        errorMessage: payload.errorMessage,
      };
    },
    checkingCredentials: (state) => {
      state.sessionStatus.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials } = sessionSlice.actions;
export const sessionStatus = (state) => state.sessionData.sessionStatus;
export default sessionSlice.reducer;
