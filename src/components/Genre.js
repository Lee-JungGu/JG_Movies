import React from "react";
import PropTypes from "prop-types";
import "../css/Genre.css";

function Genre({ getGenre }) {
  let startX = 0;
  let currentX = 0;
  const dragStart = (e) => {
    startX = e.changedTouches[0].clientX;
  };
  const drag = (e) => {
    const MAX_LEFT = 20;
    const MAX_RIGHT = -50;
    const SLIDER_SPEED = 10;
    if (startX > e.changedTouches[0].clientX) {
      if (currentX > MAX_RIGHT) {
        currentX =
          e.changedTouches[0].clientX -
          (e.changedTouches[0].clientX + SLIDER_SPEED) +
          currentX;
      }
    } else {
      if (currentX < MAX_LEFT) {
        currentX =
          e.changedTouches[0].clientX -
          (e.changedTouches[0].clientX - SLIDER_SPEED) +
          currentX;
      }
    }
    const dragMenu = document.querySelector(".drag_menu");
    dragMenu.style.left = `${currentX}px`;
  };
  return (
    <div className="genre_menu">
      <ul
        className="drag_menu"
        draggable="true"
        onTouchStart={dragStart}
        onTouchMove={drag}
      >
        <li>
          <p data-genre="all" onClick={getGenre}>
            All
          </p>
        </li>

        <li>
          <p data-genre="action" onClick={getGenre}>
            Action
          </p>
        </li>

        <li>
          <p data-genre="thriller" onClick={getGenre}>
            Thriller
          </p>
        </li>

        <li>
          <p data-genre="romance" onClick={getGenre}>
            Romance
          </p>
        </li>

        <li>
          <p data-genre="comedy" onClick={getGenre}>
            Comedy
          </p>
        </li>

        <li>
          <p data-genre="animation" onClick={getGenre}>
            Animation
          </p>
        </li>
      </ul>
    </div>
  );
}

Genre.propTypes = {
  getGenre: PropTypes.func.isRequired,
};

export default Genre;
