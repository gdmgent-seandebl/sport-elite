import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Products from "../components/Pages/Products/Index";
import ProductDetail from "../components/Pages/Products/Detail";
import ShoppingCart from "../components/Pages/ShoppingCart/ShoppingCart";
import Profile from "../components/Pages/Profile/Profile";
import Dashboard from "../components/Pages/Dashboard/Dashboard";
import ProductCreate from "../components/Pages/Products/Create";
import Conversations from "../components/Pages/Conversations/Conversations";

export const commonRoutes = (
  handleLogin: (user: any, token: string, refreshtoken: string) => void
) => [
  { path: "/", element: <Products /> },
  { path: "/login", element: <Login onLogin={handleLogin} /> },
  { path: "/register", element: <Register onLogin={handleLogin} /> },
  { path: "/products", element: <Products /> },
  { path: "/products/:id", element: <ProductDetail /> },
  { path: "*", element: <Login onLogin={handleLogin} /> },
];

export const userRoutes = [
  { path: "/cart", element: <ShoppingCart /> },
  { path: "/profile", element: <Profile /> },
];

export const sellerAdminRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/productCreate", element: <ProductCreate /> },
  { path: "/conversations", element: <Conversations /> },
];
