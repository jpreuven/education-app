import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/features/users/userSlice";
import loginOrSignupReducer from "./features/LoginOrSignup/loginOrSignupSlice";
import mobileSidebarIsOpenReducer from "./features/mobileSidebarIsOpen/mobileSidebarIsOpenSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    loginOrSignup: loginOrSignupReducer,
    mobileSidebarIsOpen: mobileSidebarIsOpenReducer,
  },
});
