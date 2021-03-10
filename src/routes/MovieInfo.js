import React from "react";
// import PropTypes from "prop-types";
import "./MovieInfo.css";

class MovieInfo extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }
  render() {
    const {
      location: { state },
    } = this.props;
    if (state) {
      return (
        <section className="movie_info">
          <img src={state.poster} alt={state.title} title={state.title} />
          <div className="movie_data">
            <h3 className="movie_title">
              {state.title} <span className="title_year">{state.year}</span>
            </h3>
            <h4 className="movie_rating">
              {state.rating.toString().includes(".")
                ? state.rating
                : `${state.rating}.0`}
            </h4>
            <ul className="genres">
              {state.genres.map((genre, index) => (
                <li key={index} className="genres_genre">
                  {genre}
                </li>
              ))}
            </ul>
            <p className="movie_summary">
              {state.summary.length > 160
                ? `${state.summary.slice(0, 160)}...`
                : state.summary}
            </p>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default MovieInfo;
