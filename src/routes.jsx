import { Navigate } from "react-router-dom";
import Login from "./components/auth/loginCard";
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";


export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hoteles",
    element: <HotelPage />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
];
