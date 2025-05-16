import { Navigate } from "react-router-dom";
import FavoritosHotelesPage from "./pages/hotel/hotel";
const PrivateRoute = ({ element }) => {
  const userDetails = localStorage.getItem("user");

  if (!userDetails) {
    return <Navigate to="/auth/login" replace />;
  }
  return element;
};

export const routes = [
  // {
  //   path: "/",
  //   element: <Navigate to="/auth/login" replace />,
  // },
  // {
  //   path: "/auth",
  //   children: [
  //     { path: "", element: <Navigate to="login" replace /> },
  //     { path: "login", element: <Login /> },
  //     { path: "register", element: <Register /> },
  //   ],
  // },
  // {
  //   path: "/dashboard",
  //   element:  <Navigate to="/dashboard" replace />,
  // },
  // {
  //   path: "*",
  //   element: <Navigate to="/auth/login" replace />,
  // },
  {
    path: "/hotel",
    element: <FavoritosHotelesPage/>
  }
];
