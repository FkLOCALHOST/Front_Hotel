import { Navigate } from "react-router-dom";
import Login from "../src/components/auth/login";
import Register from "../src/components/auth/register";
import Dashboard from "../src/pages/dashboard.jsx";
import Categorias from "../src/pages/home/categoriaPage.jsx";
import FavoritosPage from "./pages/home/favoritosPage.jsx";

const PrivateRoute = ({ element }) => {
  const userDetails = localStorage.getItem("User");

  if (!userDetails) {
    return <Navigate to="/auth/login" replace />;
  }
  return element;
};

export const routes = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    children: [
      { path: "", element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element:  <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
];
