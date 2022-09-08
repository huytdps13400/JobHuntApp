import { createSlice } from "@reduxjs/toolkit";
import { getSearchJobByKeyWord, postLogin } from "../../../api/user/user";

const initialAppState = {
  isLoggedIn: false,
  listJob: [],
  loadingListJob: false,
  KeywordJob: "",
  userId: "",
  loadingApp: false,
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
      state.KeywordJob = action.payload;
    },
    startLoading: (state, action) => {
      state.loadingApp = true;
    },
    endLoading: (state, action) => {
      state.loadingApp = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchJobByKeyWord.fulfilled, (state, action) => {
      state.listJob = action.payload || [];
      state.loadingListJob = false;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.loadingApp = false;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.userId = action.payload.userId || "";
      state.loadingApp = false;
    });
    // App initial
  },
});
export const { reducer: userReducer } = userSlice;
export const { setLoginStatus, setKeyWord, startLoading, endLoading } =
  userSlice.actions;
export default userReducer;
