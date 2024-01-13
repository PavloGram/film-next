import { createSlice } from "@reduxjs/toolkit";

const currentFilm = createSlice({
  name: " currentFilm",
  initialState: { value: null },
  reducers: {
    changeFilm: (state, data) => {state.value = data.payload},
  },
});

export const { changeFilm } = currentFilm.actions;
export default currentFilm.reducer;