import { localStorageParse } from "@/app/lib/localStorageParse";
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_QUEUE_KEY = "queue";
const queueArr = createSlice({
  name: "queueArr",
  initialState: { value: localStorageParse(LOCAL_STORAGE_QUEUE_KEY) },
  reducers: {
    changeQueueArray: (state) => {
      state.value = localStorageParse(LOCAL_STORAGE_QUEUE_KEY);
    },
  },
});

export const { changeQueueArray } = queueArr.actions;
export default queueArr.reducer;
