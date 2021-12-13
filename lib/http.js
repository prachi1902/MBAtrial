import Axios from "axios";
import { errorToast } from "components/Toasts";
import store from "redux/store";

const http = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = store.getState().user?.access_token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

function CustomError(message) {
  this.name = "CustomError";
  this.message = message || "";
  var error = new Error(this.message);
  error.name = this.name;
  this.stack = error.stack;
}
CustomError.prototype = Object.create(Error.prototype);

export const responseHandler = (response) => {
  if (response?.data) {
    if (response?.data.message) {
      if (
        response.data.status === "SUCCESS" ||
        response.data.status === "success" ||
        response.data.status === "Success" ||
        response.data.status === "Sucess" ||
        response.data.status === "200" ||
        response.data.message.status === "200" ||
        response.statusText === "OK"
      ) {
        return response?.data;
      } else {
        throw new CustomError(response.data.message.message);
      }
    } else {
      return response?.data;
    }
  } else {
    return "SUCCESS";
  }
};

export const errorHandler = (err) => {
  console.log(err);
  if (err.name === "CustomError") {
    errorToast(err.message);
    return err.message;
  }
  if (err?.response?.data?.detail) {
    if (err?.response?.data?.detail.message) {
      errorToast(JSON.stringify(err.response.data.detail.message));
    } else {
      errorToast(JSON.stringify(err.response.data.detail));
    }
  } else if (err?.response?.data) {
    errorToast(err.response.data);
  } else if (err.response?.data?.message) {
    errorToast(err.response.data.message);
  } else {
    errorToast("Something went wrong");
  }
  return err;
};

export default http;
