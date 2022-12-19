//About 2
import React from "react";


//images import
import Image1 from "./Images/Group 29.png";

import "../../App.css";

const About2 = () => {
  return (
    <div className="mainPage">
      <div className="container">
        {/* About Sec */}
        <div className="d-flex flex-wrap-reverse align-items-center justify-content-center head-flex">
          <div className="m-5">
            <img className="d-block w-70 " src={Image1} alt="Image1" />
          </div>
          <div className="m-10">
            <h1 className="h1head">Lanzamiento con los mejores</h1>
            <p className="para pt-4 pb-4">
              A centralized platform that integrates zillions of data sources
              using Big Data ELT (Extract,Load & Transform that leaves no data
              behind)
            </p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default About2;
// CODE BY GRACY PATEL