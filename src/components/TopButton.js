import React, { useEffect } from "react";
import "./TopButton.css";

function TopButton() {
  const moveTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const appearArrow = () => {
    const currentY = document.scrollingElement.scrollTop;
    const APPEAR_HEIGHT = 100;
    const topButton = document.querySelector(".top_button i");
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
    <aside className="top_button_box">
      <button className="top_button " onClick={moveTop}>
        <i className="fas fa-arrow-circle-up hide"></i>
      </button>
    </aside>
  );
}

export default TopButton;
