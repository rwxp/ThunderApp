import React from "react";
import "./PageNotFound.css";

import { useAuth } from "../../context/Context";

const PageNotFound = () => {
  const { setNavbar } = useAuth();
  setNavbar(false);
  
  return (
    <div className="PageNot">
      <header className="top-header" />
      <div>
        <div className="starsec" />
        <div className="starthird" />
        <div className="starfourth" />
        <div className="starfifth" />
      </div>

      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable" />
          <div className="cover" />
          <div className="in-cover">
            <div className="bulb" />
          </div>
          <div className="light" />
        </div>
      </div>

      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Page Not Found</h1>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
