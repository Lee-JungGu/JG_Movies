import React, { useEffect } from "react";
import "./TopButton.css";

function TopButton() {
  const moveTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const appearArrow = () => {
    const currentY = document.scrollingElement.scrollTop;
    const APPEAR_HEIGHT = 100;
    const topButton = document.querySelector(".top_button");
    console.log(currentY);
    if (currentY > APPEAR_HEIGHT) {
      topButton.classList.remove("hide");
    } else {
      topButton.classList.add("hide");
    }
  };

  useEffect(() => {
    const scrollEvent = () => {
      window.addEventListener("scroll", appearArrow);
    };
    scrollEvent();
    return () => {
      const removeScrollEvent = () => {
        window.removeEventListener("scroll", appearArrow);
      };
      removeScrollEvent();
    };
  }, []);
  return (
    <aside>
      <div className="top_button hide" onClick={moveTop}>
        <i className="fas fa-arrow-circle-up"></i>
      </div>
    </aside>
  );
}

export default TopButton;
