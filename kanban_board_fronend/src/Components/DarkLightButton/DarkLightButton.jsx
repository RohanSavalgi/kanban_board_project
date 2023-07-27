import React, { useEffect, useState } from "react";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";

import "./DarkLighButton.css";

const DarkLighButton = () => {
  const [themeState, setThemeState] = useState("light");

  useEffect(() => {
    setThemeState(localStorage.getItem("theme"));
  }, [localStorage.getItem("theme")]);

  // sets a theme to the overall apperance
  const onClickHandler = () => {
    console.log(localStorage.getItem("theme"));
    if (localStorage.getItem("theme") == "light") {
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setThemeState("dark");
    } else if (localStorage.getItem("theme") == "dark") {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setThemeState("light");
    }
  };

  return (
    <>
      <div className="darkLightButton">
        <div className="darkLightContents">
          <button className="darkLightButton" onClick={onClickHandler}>
            {themeState == "light" && (
              <img className="darkLightImage" src={moon} />
            )}
            {themeState == "dark" && (
              <img className="darkLightImage" src={sun} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default DarkLighButton;
