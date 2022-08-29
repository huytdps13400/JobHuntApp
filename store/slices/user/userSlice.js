import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAppState,
  reducers: {
    setLoginStatus: (state, action) => {
      console.log({ loginStatusSet: action.payload });
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    // App initial
  },
});
export const { reducer: userReducer } = userSlice;
export const { setLoginStatus } = userSlice.actions;
export default userReducer;
