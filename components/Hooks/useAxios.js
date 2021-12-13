import { useState, useEffect } from "react";
import axios from "lib/http";
import { errorToast, successToast } from "components/Toasts";

const useAxios = ({
  url,
  method = "get",
  manual = false,
  showToast = false,
  toastMessage = "",
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function CustomError(message) {
    this.name = "CustomError";
    this.message = message || "";
    var error = new Error(this.message);
    error.name = this.name;
    this.stack = error.stack;
  }
  CustomError.prototype = Object.create(Error.prototype);

  useEffect(() => {
    if (method === "get" && !manual) {
      execute();
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (showToast) {
        successToast(toastMessage || response?.message || "SUCCESS!");
      }
    }
  }, [response, error]);

  const init = () => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  };

  const execute = (
    args = {
      data: {},
      params: {},
      options: {},
      slug: "",
    }
  ) => {
    init();
    setIsLoading(true);
    const { data, params, options, slug } = args;
    axios({
      url: slug ? `${url}/${slug}` : url,
      method: method,
      params: params,
      data: data,
      ...options,
    })
      .then((response) => {
        if (response?.data) {
          if (response?.data.message) {
            console.log(response.data);
            if (
              response.data.status === "SUCCESS" ||
              response.data.status === "success" ||
              response.data.status === "Success" ||
              response.data.status === "Sucess" ||
              response.data.status === "200" ||
              response.data.message.status === "200"
            ) {
              setResponse(response?.data);
              return response?.data;
            } else {
              throw new CustomError(response.data.message);
            }
          } else {
            setResponse(response?.data);
            return response?.data;
          }
        } else {
          setResponse("SUCCESS");
          return "SUCCESS";
        }
      })
      .catch((err) => {
        if (err.name === "CustomError") {
          errorToast(err.message);
          return err.message;
        }
        if (err.response?.data?.detail) {
          errorToast(JSON.stringify(err.response.data.detail));
        } else if (err.response?.data) {
          errorToast(err.response.data);
        } else {
          errorToast("Something went wrong");
        }
        return err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    response,
    error,
    isLoading,
    execute,
    init,
  };
};

export default useAxios;
