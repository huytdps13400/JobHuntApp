import { createSlice } from "@reduxjs/toolkit";
import {
  getJobDetail,
  getProfileAccount,
  getSearchJobByKeyWord,
  postLogin,
} from "../../../api/user/user";

const initialAppState = {
  isLoggedIn: false,
  listJob: [],
  loadingListJob: false,
  KeywordJob: "",
  userId: "",
  loadingApp: false,
  jobDetail: {},
  profile: {},
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
    builder.addCase(getJobDetail.fulfilled, (state, action) => {
      state.jobDetail = action.payload || {};
    });
    builder.addCase(getProfileAccount.fulfilled, (state, action) => {
      state.profile = action.payload || {};
    });
    // App initial
  },
});
export const { reducer: userReducer } = userSlice;
export const { setLoginStatus, setKeyWord, startLoading, endLoading } =
  userSlice.actions;
export default userReducer;
