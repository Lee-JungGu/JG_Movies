import React from "react";
import "../css/MovieInfo.css";

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
          <div className="info_backgrond">
            <img src={state.poster} alt={state.title} title={state.title} />
          </div>
          <div className="info_info">
            <div className="info_title_img">
              <img src={state.poster} alt={state.title} title={state.title} />
            </div>
            <div className="info_data">
              <h3 className="info_title">
                {state.title} <span className="title_year">{state.year}</span>
              </h3>
              <h4 className="info_rating">
                {state.rating.toString().includes(".")
                  ? state.rating
                  : `${state.rating}.0`}
              </h4>
              <ul className="info_genres">
                {state.genres.map((genre, index) => (
                  <li key={index} className="genres_genre">
                    {genre}
                  </li>
                ))}
              </ul>
              <p className="info_summary">{state.summary}</p>
            </div>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default MovieInfo;
