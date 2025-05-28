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
          Vive, explora y recuerda. Con LocalHotel, cada viaje se convierte en
          una historia que vale la pena contar. Descubre hoteles con encanto,
          experiencias auténticas y eventos que te conectan con lo mejor de cada
          destino en LocalHotel te ayudamos a transformar tus momentos en
          recuerdos eternos.
        </p>
        <button>Explorar</button>
      </div>
    </div>
  );
};

export default VideoFondo;
