import { configureStore } from "@reduxjs/toolkit";
import responseData from "../reducers/responseData";
import searchValue from "../reducers/searchValue";
import libraryToggle from "../reducers/libraryToggle";
import watchArr from "../reducers/watchArr";
import queueArr from "../reducers/queueArr";
import activeModal from "../reducers/activeModal";
import currentFilm from "../reducers/currentFilm";
import currentPage from "../reducers/currentPage";

export const store = configureStore({
    reducer: {
     responseData: responseData,
     searchValue: searchValue,
     libraryToggle: libraryToggle,
     watchArr: watchArr,
     queueArr: queueArr,
     activeModal: activeModal,
     currentFilm: currentFilm,
     currentPage: currentPage,
    },
  });