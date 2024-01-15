import { createSlice } from "@reduxjs/toolkit";

const currentPage = createSlice({
  name: " currentPage",
  initialState: { value: 1 },
  reducers: {
    changePage: (state, data) => {state.value = data.payload},
  },
});

export const { changePage } = currentPage.actions;
export default currentPage.reducer;