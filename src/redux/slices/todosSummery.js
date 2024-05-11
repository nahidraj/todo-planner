import { createSlice } from "@reduxjs/toolkit";

export const todosSummerySlice = createSlice({
  name: "planSummery",
  initialState: {
    total: [],
  },
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
})

export const { setTotal } = todosSummerySlice.actions;

export default todosSummerySlice.reducer;