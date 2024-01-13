import { createSlice } from "@reduxjs/toolkit";

const responseData = createSlice({
  name: "responseData",
  initialState: { value: null },
  reducers: {
    setData: (state, data) => {state.value = data.payload},
  },
});

export const { setData } = responseData.actions;
export default responseData.reducer;