const API_KEY = '1962278b5026dd7c7bb0a91cd47f798b';
const BASE_URL_QUERY = "https://api.themoviedb.org/3/search/movie";
const BASE_URL_POPULAR = "https://api.themoviedb.org/3/trending/movie/week";


async function fetchFilms(value, page = 1) {
  if (typeof value === "string") {
    const searchParamsToQuery = new URLSearchParams({
      api_key: API_KEY,
      query: value,
      page,
    });
    const url = `${BASE_URL_QUERY}?${searchParamsToQuery}`;

    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  } else if (Array.isArray(value)) {
    return await Promise.all(
      value.map(async (el) => {
        const url = `https://api.themoviedb.org/3/movie/${el}?api_key=${API_KEY}`;
        return await fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        });
      })
    );
  } else {
    const searchParamsToQuery = new URLSearchParams({
      api_key: API_KEY,
      page,
    });
    const url = `${BASE_URL_POPULAR}?${searchParamsToQuery}`;

    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}

export default fetchFilms;