import { postLoginUrl } from "../endpoints/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NetWorkService } from "../../apiServer";

export const postDeviceInfo = createAsyncThunk(
  "auth/postDeviceInfo",
  async (fields) => {
    const response = await NetWorkService.Post({
      url: postLoginUrl,
      body: fields,
    });
    // handle after called successfully
    console.log("postLoginUrl", response);
    return response;
  }
);
