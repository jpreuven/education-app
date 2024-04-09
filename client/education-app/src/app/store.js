import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/features/users/userSlice";
import loginOrSignupReducer from "./features/LoginOrSignup/loginOrSignupSlice";
import mobileSidebarIsOpenReducer from "./features/mobileSidebarIsOpen/mobileSidebarIsOpenSlice";
import assignmentFormDropdownReducer from "./features/assignmentFormDropdown/assignmentFormDropdownSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    loginOrSignup: loginOrSignupReducer,
    mobileSidebarIsOpen: mobileSidebarIsOpenReducer,
    assignmentFormDropdown: assignmentFormDropdownReducer,
  },
});
