import { createSlice } from "@reduxjs/toolkit";

const ActiveModal = createSlice({
  name: " ActiveModal",
  initialState: { value: false },
  reducers: {
    changeStateActive: (state) => {state.value = !state.value}
  },
});

export const {changeStateActive} =  ActiveModal.actions
export default ActiveModal.reducer