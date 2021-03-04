import React from "react";
import axios from "axios";
import Header from "../components/Header";
import Movie from "../components/Movie";
import Footer from "../components/Footer";

class Main extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    apiUrl:
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=all",
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(this.state.apiUrl);
    this.setState({ movies, isLoading: false });
  };

  clickMenu = (props) => {
    const checkBox = document.getElementById("gnb_btn");
    checkBox.checked ? (checkBox.checked = false) : (checkBox.checked = false);
    const {
      target: {
        dataset: { genre },
      },
    } = props;
    this.state.apiUrl ===
      `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=${genre}` ||
      this.setState({
        apiUrl: `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=${genre}`,
        isLoading: true,
      });
  };

  scrollGetPage = () => {
    document.addEventListener("scroll", () => {
      const scrollTop = document.scrollingElement.scrollTop;
      const scrollBottom =
        document.scrollingElement.scrollHeight -
        document.scrollingElement.clientHeight;
      const numberOfMovie = this.state.movies.length;
      const limitPage = 16;
      for (let i = 1; i < limitPage; i++) {
        if (scrollTop === scrollBottom && numberOfMovie === 24 * i) {
          const getNextPage = async () => {
            const {
              data: {
                data: { movies },
              },
            } = await axios.get(`${this.state.apiUrl}&page=${i + 1}`);
            const newPage = this.state.movies.concat(movies);
            this.setState({ movies: newPage });
          };
          getNextPage();
        }
      }
    });
  };

  componentDidMount() {
    this.getMovies();
    this.scrollGetPage();
  }

  componentDidUpdate() {
    this.state.isLoading === false || this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        <Header event={this.clickMenu} />
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loding...</span>
          </div>
        ) : (
          <div className="warp">
            <div className="movies">
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
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
