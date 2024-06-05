export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterBody = {
  email: string;
  password: string;
  name: string;
  seller: boolean;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  seller: boolean;
  admin: boolean;
  favorites: string[];
  orders: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
