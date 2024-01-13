import { localStorageParse } from "@/app/lib/localStorageParse";
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_WATCHED_KEY = "watched";

 const watchArr = createSlice({
  name: "watchArr",
  initialState: { value: localStorageParse(LOCAL_STORAGE_WATCHED_KEY)},
  reducers: {
    changeWatchedArray: (state) => {state.value = localStorageParse(LOCAL_STORAGE_WATCHED_KEY);
    },
  },
});

export const { changeWatchedArray } = watchArr.actions;
export default watchArr.reducer;