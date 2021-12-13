import { toast } from "react-toastify";

export const errorToast = (message) =>
  toast(message, {
    position: "top-center",
    autoClose: 5000,
    type: "error",
    theme: "light",
  });

export const successToast = (message) =>
  toast(message, {
    position: "top-center",
    autoClose: 5000,
    type: "success",
    theme: "light",
  });
