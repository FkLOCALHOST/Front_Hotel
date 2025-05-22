import { Navigate } from "react-router-dom";
import Login from "./components/auth/loginCard";
import HotelPage from "./pages/hotel/hotel";
import Home from "./pages/Home";
<<<<<<< Updated upstream

const PrivateRoute = ({ element }) => {
  // const userDetails = localStorage.getItem("user");

  // if (!userDetails) {
  //   return <Navigate to="/hoteles" replace />;
  // }
  return element;
};
=======
import HabitacionesPage from "./pages/habitaciones/habitaciones"
import EventDashboard from "./pages/event/EventDashboard";
import ReservacionesPage from './pages/reservations/reservaciones'

>>>>>>> Stashed changes

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hoteles",
    element: <HotelPage />,
  },
<<<<<<< Updated upstream
=======
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
  },
  {
    path: "/reservaciones",
    element: < ReservacionesPage />,
  }
>>>>>>> Stashed changes
];
