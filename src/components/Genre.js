import React from "react";
import PropTypes from "prop-types";
import "../css/Genre.css";

function Genre({ getGenre }) {
  return (
    <div className="genre_menu">
      <ul className="drag_menu">
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
