import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Movie.css";

function Movie({ year, title, summary, poster, genres, rating }) {
  return (
    <Link
      to={{
        pathname: "/Info",
        state: {
          year,
          title,
          summary,
          poster,
          genres,
          rating,
        },
      }}
      className="movie"
    >
      <div>
        <img src={poster} alt={title} title={title} />
        <div className="movie_data">
          <h3 className="movie_title">
            {title} <span className="title_year">{year}</span>
          </h3>
          <h4 className="movie_rating">
            {rating.toString().includes(".") ? rating : `${rating}.0`}
          </h4>
          <ul className="genres">
            {genres.map((genre, index) => (
              <li key={index} className="genres_genre">
                {genre}
              </li>
            ))}
          </ul>
          <p className="movie_summary">
            {summary.length > 160 ? `${summary.slice(0, 160)}...` : summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
};

export default Movie;
