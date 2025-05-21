import { Navigate } from "react-router-dom";
import Login from "./components/auth/loginCard";
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";
import HabitacionesPage from "./pages/habitaciones/habitaciones"
import EventDashboard from "./pages/event/EventDashboard";

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
    path: "/eventos",
    element: <EventDashboard/>
  },
  {
    path: "/habitaciones",
    element: < HabitacionesPage/>,
  }
];
