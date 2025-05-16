import "./App.css";
import { Navbar } from "./components/navbar.jsx";
import VideoFondo from "./components/home/video.jsx";
import  SimpleFooter  from "./components/footer.jsx";
import FilterBar from "./components/FilterBar.jsx";


function App() {

  return (
    <>
        <Navbar />
        <FilterBar />
        <VideoFondo />
        <SimpleFooter />
    </>
  );
} 

export default App;
