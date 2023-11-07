import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "nookies";
import { HttpClient } from "@/api/axiosInstance";
import { AxiosError } from "axios";

const baseInstanse = HttpClient.getBaseInstance();
const authorizedInstance = HttpClient.getAuthorizedInstance();

export interface ServerError {
    error: {
        message: string;
        status: number;
        name: string;
    };
}

export const login = createAsyncThunk<
  { user: User; jwt: string },
  UserAPI.SigninForm,
  { rejectValue: string }
>("auth/login", async function (data, thunkAPI) {
  try {
    const { user, jwt } = (await baseInstanse.post("auth/local", data)).data;

    setCookie(null, "jwt", jwt, {
      path: "/",
    });

    HttpClient.updateAuthorizedInstance(jwt);
    return thunkAPI.fulfillWithValue({ user, jwt });
  } catch (err) {
    const { error } = (err as AxiosError).response?.data as ServerError;
    const { message } = error;
    return thunkAPI.rejectWithValue(message);  }
});

export const register = createAsyncThunk<
  { user: User; jwt: string },
  UserAPI.SignupForm,
  { rejectValue: string }
>("auth/register", async function (data, thunkAPI) {
  try {
    const { user } = (await baseInstanse.post("auth/local/register", data))
      .data;

    return thunkAPI.fulfillWithValue(user);
  } catch (err) {
    const { error } = (err as AxiosError).response?.data as ServerError;
    const { message } = error;
    return thunkAPI.rejectWithValue(message);  }
});

export const getMe = createAsyncThunk(
  "auth/getMe",
  async function (_, thunkAPI) {
    try {
      const user = (await authorizedInstance.get("users/me?populate=*")).data;
      return thunkAPI.fulfillWithValue(user);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);    }
  }
);
