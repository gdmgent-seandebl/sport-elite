import { API } from "../../network/api";
import { LoginBody, RegisterBody } from "./auth.types";

export const login = (body: LoginBody) => {
  return API.post("/login", body);
};

export const register = (body: RegisterBody) => {
  return API.post("/register", body);
};

export const getCurrentUser = () => {
  return API.get("/users/current");
};
