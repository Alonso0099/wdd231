const FAVORITES_KEY = "prepPantryFavorites";

export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  if (favorites) {
    return JSON.parse(favorites);
  }

  return [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(foodId) {
  const favorites = getFavorites();
  return favorites.includes(foodId);
}

export function toggleFavorite(foodId) {
  let favorites = getFavorites();

  if (favorites.includes(foodId)) {
    favorites = favorites.filter((id) => id !== foodId);
  } else {
    favorites.push(foodId);
  }

  saveFavorites(favorites);
  return favorites;
}