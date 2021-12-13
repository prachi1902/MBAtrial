import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  email: "",
  isLoggedIn: null,
  isAdmin: false,
  name: "",
  access_token: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.access_token = action.payload.access_token;
      state.email = action.payload.user?.email;
      state.name = action.payload.user?.name;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state.access_token = "";
      state.email = "";
      state.name = "";
      state.isLoggedIn = false;
    },
  },
});

export const useUser = () => {
  const dispatch = useDispatch();
  const { loginUser, logoutUser } = UserSlice.actions;

  const userDispatch = {
    loginUser: (data) => dispatch(loginUser(data)),
    logoutUser: (data) => dispatch(logoutUser(data)),
  };

  const userState = useSelector((state) => state.user);

  return { userState, userDispatch };
};

export default UserSlice.reducer;
