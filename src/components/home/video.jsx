import React from "react";
import "../../assets/styles/home/hero.css";

const VideoFondo = () => {
  return (
    <div className="bienvenida">
      <video className="video-bg" autoPlay loop muted>
        <source src="/videos/home.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
      <div className="content">
        <h1>Bienvenidos</h1>
        <p>
          Explora experiencias únicas, reserva hoteles y descubre eventos
          inolvidables.
        </p>
        <button>Explorar</button>
      </div>
    </div>
  );
};

export default VideoFondo;
