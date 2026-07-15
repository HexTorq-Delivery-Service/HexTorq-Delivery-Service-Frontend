"use client";

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  hotel: string;
  isVeg: boolean;
  image?: string;
}

export const getFavorites = (): FavoriteItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("favorites_v2");
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
  if (typeof window === "undefined") return false;
  let favorites = getFavorites();
  const isFavorite = favorites.some(f => f.id === item.id);
  if (isFavorite) {
    favorites = favorites.filter((f) => f.id !== item.id);
  } else {
    favorites.push(item);
  }
  localStorage.setItem("favorites_v2", JSON.stringify(favorites));
  window.dispatchEvent(new Event("favorites_updated"));
  return !isFavorite;
};

// Recent Searches
export const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("recent_searches");
  return stored ? JSON.parse(stored) : [];
};

export const addRecentSearch = (query: string) => {
  if (typeof window === "undefined") return;
  if (!query.trim()) return;
  let searches = getRecentSearches();
  searches = [query, ...searches.filter((s) => s !== query)].slice(0, 5);
  localStorage.setItem("recent_searches", JSON.stringify(searches));
};

// Order History
export interface OrderHistoryItem {
  id: string;
  token: string;
  mobileNumber: string;
  createdAt: string;
}

export const getOrderHistory = (): OrderHistoryItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("order_history");
  return stored ? JSON.parse(stored) : [];
};

export const addOrderToHistory = (order: OrderHistoryItem) => {
  if (typeof window === "undefined") return;
  const history = getOrderHistory();
  history.unshift(order);
  localStorage.setItem("order_history", JSON.stringify(history.slice(0, 10)));
};
