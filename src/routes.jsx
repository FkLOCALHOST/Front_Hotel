import Login from "./components/auth/loginCard";
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";
import HabitacionesPage from "./pages/habitaciones/habitaciones";
import EventDashboard from "./pages/event/EventDashboard";
<<<<<<< HEAD
import Favoritos from "./pages/favoritos/favoritos"
=======
import EventForm from "./components/forms/EventForm";
import ReservacionesPage from "./pages/reservations/reservaciones";
>>>>>>> origin/cmorales-2021365

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
<<<<<<< HEAD
    element: < HabitacionesPage/>,
  },
  {
    path: "/favoritos",
    element: < Favoritos/>,
=======
    element: <HabitacionesPage />,
  },
  {
    path: "/eventos/registrar-evento",
    element: <EventForm />,
  },
  {
    path: "/reservaciones",
    element: < ReservacionesPage />,
>>>>>>> origin/cmorales-2021365
  }
];
