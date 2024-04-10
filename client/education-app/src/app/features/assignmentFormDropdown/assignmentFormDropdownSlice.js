import { createSlice } from "@reduxjs/toolkit";

export const assignmentFormDropdownSlice = createSlice({
  name: "assignmentFormDropdownSlice",
  initialState: {
    value: false,
  },
  reducers: {
    setAssignmentFormDropdown: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAssignmentFormDropdown } =
  assignmentFormDropdownSlice.actions;
export default assignmentFormDropdownSlice.reducer;
