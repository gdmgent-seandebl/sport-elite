import { User } from "core/modules/auth/auth.types";

export type AuthContextType = {
  user: User | null;
  handleLogout: () => void;
  handleLogin: (user: User, token: string, refreshtoken: string) => void;
};
