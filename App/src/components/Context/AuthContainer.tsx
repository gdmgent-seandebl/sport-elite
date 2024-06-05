import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "../../core/modules/auth/auth.api";
import { AuthContextType } from "./AuthContext.types";
import { User } from "../../core/modules/auth/auth.types";
import {
  getAuthToken,
  saveAuthToken,
  saveRefreshToken,
} from "../../core/storage";
import { API } from "../../core/network/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = getAuthToken();
  const navigate = useNavigate();

  const isTokenValid = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token && isTokenValid(token)) {
        try {
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  const handleLogin = (user: User, token: string, refreshtoken: string) => {
    saveAuthToken(token);
    saveRefreshToken(refreshtoken);
    setUser(user);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (user?.seller || user?.admin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    setUser(null);
    saveAuthToken(null);
    delete API.defaults.headers.common["Authorization"];
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContainer;
