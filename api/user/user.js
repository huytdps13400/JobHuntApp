import {
  postLoginUrl,
  getSearchJobByKeyWordUrl,
  getJobDetailUrl,
  getProfileUrl,
  postCvUrl,
} from "../endpoints/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NetWorkService } from "../../apiServer";

export const postLogin = createAsyncThunk("user/postLogin", async (fields) => {
  console.log("kaka");
  const response = await NetWorkService.Post({
    url: postLoginUrl,
    body: fields,
  });
  // handle after called successfully
  console.log("postLoginUrl", response);
  return response;
});

export const getSearchJobByKeyWord = createAsyncThunk(
  "user/getSearchJobByKeyWord",
  async (fields) => {
    const response = await NetWorkService.Get({
      url: getSearchJobByKeyWordUrl,
      params: fields,
    });
    // handle after called successfully
    console.log("getSearchJobByKeyWord", response);
    return response;
  }
);

export const getJobDetail = createAsyncThunk(
  "user/getJobDetail",
  async (fields) => {
    const response = await NetWorkService.Get({
      url: `${getJobDetailUrl}/${fields.jobId}`,
      params: fields,
    });
    // handle after called successfully
    console.log("getJobDetail", response);
    return response;
  }
);

export const getProfileAccount = createAsyncThunk(
  "user/getProfileUrl",
  async (fields) => {
    const response = await NetWorkService.Get({
      url: getProfileUrl,
      params: fields,
    });
    // handle after called successfully
    console.log("getProfileUrl", response);
    return response;
  }
);

export const postProfileCv = createAsyncThunk(
  "user/postProfileCv",
  async (fields) => {
    const response = await NetWorkService.Post({
      url: postCvUrl,
      body: fields,
    });
    // handle after called successfully
    console.log("postProfileCv", response);
    return response;
  }
);
