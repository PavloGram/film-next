import { createSlice } from "@reduxjs/toolkit";

const searchValue = createSlice({
  name: "searchValue",
  initialState: { value: null },
  reducers: {
    setSearchValue: (state, data) => {state.value = data.payload},
  },
});

export const { setSearchValue } = searchValue.actions;
export default searchValue.reducer;