import "./App.css";
import { Navbar } from "./components/navbar.jsx";
import VideoFondo from "./components/home/video.jsx";
import SimpleFooter from "./components/footer.jsx";
import HotelCard from "./components/hotels/hotelCard";

function App() {
  return (
    <>
      <Navbar />
      <VideoFondo />
      <h1> Mundo</h1>
      <HotelCard />
      <SimpleFooter />
    </>
  );
}

export default App;
