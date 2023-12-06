import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthScreenDisplay, AuthPageState } from "@/app/types";
import { AppState } from "../store";

const initialState: AuthPageState = {
  displayComponent: AuthScreenDisplay.signIn,
};

export const authPageSlice = createSlice({
  name: "authpage",
  initialState:initialState,
  reducers: {
    changeAuthDisplay: (state, action: PayloadAction<AuthScreenDisplay>) => {
      state.displayComponent = action.payload;
    },
  }, 
});

export const { changeAuthDisplay } = authPageSlice.actions

export const currentAuthState = (state: AppState) => state.authpage.displayComponent;

export default authPageSlice.reducer 