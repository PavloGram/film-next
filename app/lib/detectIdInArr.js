export function detectIdInArrey(arreyIdFilms, currentFilm) {
  let arrey = arreyIdFilms || [];
  if (arrey.includes(currentFilm?.id)) {
    return true;
  } else {
    return false;
  }
}
