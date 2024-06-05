import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  commonRoutes,
  userRoutes,
  sellerAdminRoutes,
} from "./consts/RoutesConfig";
import { useAuth } from "./components/Context/AuthContainer";

const AuthenticatedApp: React.FC = () => {
  const { user, handleLogin } = useAuth();

  return (
    <Routes>
      {commonRoutes(handleLogin).map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {user &&
        !user.seller &&
        !user.admin &&
        userRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      {user &&
        (user.seller || user.admin) &&
        sellerAdminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
    </Routes>
  );
};

export default AuthenticatedApp;
