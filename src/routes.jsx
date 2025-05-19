import { Navigate } from "react-router-dom";
import Login from "./components/auth/loginCard";
import Register from "../src/components/auth/register";
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";

const PrivateRoute = ({ element }) => {
  // const userDetails = localStorage.getItem("user");

  // if (!userDetails) {
  //   return <Navigate to="/hoteles" replace />;
  // }
  return element;
};

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hoteles",
    element: <HotelPage />,
  },
];
