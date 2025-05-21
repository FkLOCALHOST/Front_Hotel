import { Navigate } from "react-router-dom";
import Login from "./components/auth/loginCard";
import Register from "./components/auth/registerCard"
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";
import HabitacionesPage from "./pages/habitaciones/habitaciones"


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
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/habitaciones",
    element: < HabitacionesPage/>,
  },
];
