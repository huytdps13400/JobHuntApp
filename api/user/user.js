import { postLoginUrl } from "../endpoints/user";
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
