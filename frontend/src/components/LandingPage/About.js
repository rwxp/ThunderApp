//About Page 1
import React from "react";
import "../../App.css";
//Image import
import Image2 from "./Images/timeline.png";
import Image3 from "./Images/newsletter-dev.png";
import Image4 from "./Images/chart-bar-33.png";
import About2 from "./About2";
import { useEffect } from "react";
import Navbar from './Navbar.js'

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="mainPage">
      <Navbar />  
      <div className="container pt-5">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <div className="m-5 textView pt-3">
            <h1 className="h2head">Estadísticas de consumo</h1>
            <p className="textAbout pt-4 pb-4 text-center">
              Esta aplicación permite gestionar toda la información necesaria 
              sobre el consumo de sus clientes con gráficas, tablas de consumo, 
              diagramas que muestran de manera gráfica todos los datos
            </p>
          </div>
        </div>
        {/* Card 1 */}
        <div className="d-flex align-content-between justify-content-center flex-wrap">
          <div className="m-3 viewCard">
            <img className="d-block" src={Image2} alt="Image1" />
            <div className="cardH1 pt-5">
              <h3>Datos en tiempo real</h3>
              <p className="pt-3 cardText">
                Recopila datos en tiempo real de múltiples canales y los mueve
                en un lago de datos, para mostrarlos de manera gráfica.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="m-3 viewCard">
            <img className="d-block" src={Image3} alt="icon" />
            <div className="cardH1 pt-5">
              <h3>Algoritmos poderosos</h3>
              <p className="pt-3 cardText">
                Con la ayuda de poderosos algoritmos, reglas de calidad y técnicas,
                podemos obtener datos de manera simplificada.

              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="m-8 viewCard">
            <img className="d-block" src={Image4} alt="Imageq" />
            <div className="cardH1 pt-5">
              <h3>Información empresarial</h3>
              <p className="pt-3 cardText">
                Recopile datos limpios procesados ​que estén listos para ser analizados para
                recopilar valiosos conocimientos empresariales.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br /><br />
      <About2 />
    </div>
  );
};
export default About;
// CODE BY GRACY PATEL
