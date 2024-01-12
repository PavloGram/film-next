export function localStorageParse(storageKey) {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
      console.log(error);
    }
  }