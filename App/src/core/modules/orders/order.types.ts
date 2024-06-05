export type Product = {
  _id: string;
  name: string;
  sellerId: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ProductBody = {
  productId: Product;
  quantity: number;
};

export type ProductOrderBody = {
  productId: string;
  quantity: number;
};

export type CreateOrderBody = {
  products: ProductOrderBody[];
};

export type Order = {
  _id: string;
  userId: string;
  products: ProductBody[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
