import Login from "./components/auth/loginCard";
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";
import HabitacionesPage from "./pages/habitaciones/habitaciones";
import EventDashboard from "./pages/event/EventDashboard";
import Favoritos from "./pages/favoritos/favoritos"
import EventForm from "./components/forms/EventForm";
import ReservacionesPage from "./pages/reservations/reservaciones";


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
    element: <EventDashboard />,
  },
  {
    path: "/habitaciones",
    element: < HabitacionesPage/>,
  },
  {
    path: "/favoritos",
    element: < Favoritos/>,
  },
  {
    path: "/eventos/registrar-evento",
    element: <EventForm />,
  },
  {
    path: "/reservaciones",
    element: < ReservacionesPage />,
  }
];
