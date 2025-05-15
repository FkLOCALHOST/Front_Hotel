import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar.jsx";
import VideoFondo from "./components/home/video.jsx";
import  SimpleFooter  from "./components/footer.jsx";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Navbar />
        <VideoFondo />
        <h1>   Mundo</h1>
        <SimpleFooter />
    </>
  );
} 

export default App;
