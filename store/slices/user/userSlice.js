import { createSlice } from "@reduxjs/toolkit";
import { getSearchJobByKeyWord } from "../../../api/user/user";

const initialAppState = {
  isLoggedIn: false,
  listJob: [],
  loadingListJob: false,
  KeywordJob: ''
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAppState,
  reducers: {
    setLoginStatus: (state, action) => {
      console.log({ loginStatusSet: action.payload });
      state.isLoggedIn = action.payload;
    },
    setKeyWord: (state, action) => {
      state.KeywordJob = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchJobByKeyWord.fulfilled, (state, action) => {
      state.listJob = action.payload || [];
      state.loadingListJob = false;
    });
    // App initial
  },
});
export const { reducer: userReducer } = userSlice;
export const { setLoginStatus, setKeyWord } = userSlice.actions;
export default userReducer;
