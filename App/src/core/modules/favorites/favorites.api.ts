import { API } from "../../../core/network/api";

const addFavorite = (productId: string) => {
  return API.post<string[]>(`/favorites/${productId}`);
};

const removeFavorite = (productId: string) => {
  return API.delete<string[]>(`/favorites/${productId}`);
};

export { addFavorite, removeFavorite };
