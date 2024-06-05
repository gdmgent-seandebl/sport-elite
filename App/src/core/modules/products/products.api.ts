import { API } from "../../../core/network/api";
import { Product } from "./products.types";

const getProducts = () => {
  return API.get<Product[]>(`/products`);
};

const getProductById = (productId: string) => {
  return API.get<Product>(`/products/${productId}`);
};

const createProduct = (product: Product) => {
  return API.post<Product>(`/products`, product);
};

const updateProduct = (productId: string, product: Product) => {
  return API.patch<Product>(`/products/${productId}`, product);
};

const deleteProduct = (productId: string) => {
  return API.delete<void>(`/products/${productId}`);
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
