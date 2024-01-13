import { localStorageParse } from "@/app/lib/localStorageParse";
import { create } from "zustand";
const LOCAL_STORAGE_WATCHED_KEY = "watched";
const LOCAL_STORAGE_QUEUE_KEY = "queue";
export const useModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export const useCurrentFilm = create((set) => ({
  currentFilm: {},
  setCurrentFilm: (e) => set({ currentFilm: { e } }),
}));

export const useWatchArr = create((set) => ({
  watchArr: localStorageParse(LOCAL_STORAGE_WATCHED_KEY),
  setArr: () => set({ watchArr: localStorageParse(LOCAL_STORAGE_WATCHED_KEY) }),
}));

export const useQueueArr = create((set) => ({
  queueArr: localStorageParse(LOCAL_STORAGE_QUEUE_KEY),
  setArr: () => set({ queueArr: localStorageParse(LOCAL_STORAGE_QUEUE_KEY) }),
}));

export const useLibraryToggle = create((set) => ({
  stateToggle: true,
  setStateToggle: (e) => set({ stateToggle: e }),
}));

export const useResponseData = create((set) => ({
  data : {},
  setResponseData: (e) => set({data : e})
}))
