export function localStorageParse(storageKey) {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
      console.log(error);
    }
  }
}
