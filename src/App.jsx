import "./App.css";
import { Navbar } from "./components/navbar.jsx";
import VideoFondo from "./components/home/video.jsx";
import SimpleFooter from "./components/footer.jsx";
import HotelCard from "./components/hotels/hotelCard";
import {routes} from "./routes"
import { useRoutes } from "react-router-dom";

function App() {

  let element = useRoutes(routes);

  return (
    <>
      {element}
      <Navbar />
      <VideoFondo />
      <HotelCard />
      <SimpleFooter />
    </>
  );
}

export default App;
