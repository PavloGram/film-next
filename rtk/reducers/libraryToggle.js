import { createSlice } from "@reduxjs/toolkit";

const libraryToggle = createSlice({
  name: "libraryToggle",
  initialState: { value: true },
  reducers: {
    setToggleTrue: (state) => {state.value = true},
    setToggleFalse: (state) => {state.value = false},
  },
});

export const { setToggleTrue, setToggleFalse } = libraryToggle.actions;
export default libraryToggle.reducer;