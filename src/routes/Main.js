import React from "react";
import axios from "axios";
import Genre from "../components/Genre";
import Loader from "../components/Loader";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import "./Main.css";
import "../components/Reset.css";

class Main extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    apiUrl:
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=all",
    pageNumber: 1,
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(this.state.apiUrl);
    this.setState({ isLoading: false, movies });
  };

  clickGetGenre = (props) => {
    const {
      target: {
        dataset: { genre },
      },
    } = props;

    this.state.apiUrl !==
      `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=${genre}` &&
      this.setState({
        isLoading: true,
        apiUrl: `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=${genre}`,
      });

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    this.setState({ pageNumber: 1 });
  };

  getPage = async () => {
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollBottom =
      document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      200;
    const numberOfMovie = this.state.movies.length;
    const pageNumber = this.state.pageNumber;
    const loader = document.querySelector(".loader_scroll");
    const isLoading = this.state.isLoading;
    const checkLoading = loader.className.includes("show");
    if (
      scrollTop >= scrollBottom &&
      numberOfMovie === 24 * pageNumber &&
      !checkLoading &&
      !isLoading
    ) {
      loader.classList.add("show");
      try {
        const {
          data: {
            data: { movies },
          },
        } = await axios.get(`${this.state.apiUrl}&page=${pageNumber + 1}`);
        const newPage = this.state.movies.concat(movies);
        const limitPage = 16;
        pageNumber < limitPage &&
          this.setState({ movies: newPage, pageNumber: pageNumber + 1 });
      } finally {
        loader.classList.remove("show");
      }
    }
  };
  scrollEvent = () => {
    document.addEventListener("scroll", this.getPage);
  };
  removeScrollEvent = () => {
    document.removeEventListener("scroll", this.getPage);
  };

  componentDidMount() {
    this.getMovies();
    this.scrollEvent();
  }

  componentDidUpdate() {
    this.state.isLoading === false || this.getMovies();
  }

  componentWillUnmount() {
    this.removeScrollEvent();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        <Loader name={"loader_scroll"} />
        {isLoading ? (
          <Loader name={"loader"} />
        ) : (
          <div className="contents">
            <Genre getGenre={this.clickGetGenre} />
            <div className="movies">
              {movies.map((movie, index) => (
                <Movie
                  key={index}
                  id={movie.id}
                  year={movie.year}
                  genres={movie.genres}
                  title={movie.title}
                  rating={movie.rating}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                />
              ))}
            </div>
            <Footer />
          </div>
        )}
      </section>
    );
  }
}

export default Main;
