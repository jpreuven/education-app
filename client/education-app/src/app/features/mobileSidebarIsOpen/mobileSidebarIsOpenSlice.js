import { createSlice } from "@reduxjs/toolkit";

const mobileSidebarIsOpen = createSlice({
  name: "mobileSidebarIsOpen",
  initialState: { value: false },

  reducers: {
    setMobileSidebarIsOpen(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setMobileSidebarIsOpen } = mobileSidebarIsOpen.actions;
export default mobileSidebarIsOpen.reducer;
