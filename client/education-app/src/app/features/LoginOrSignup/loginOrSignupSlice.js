import { createSlice } from "@reduxjs/toolkit";

const loginOrSignupSlice = createSlice({
  name: "loginOrSignup",
  initialState: { value: true },

  reducers: {
    setLoginOrSignup(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setLoginOrSignup } = loginOrSignupSlice.actions;
export default loginOrSignupSlice.reducer;
