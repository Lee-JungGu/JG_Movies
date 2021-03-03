import React from "react";
import axios from "axios";
import Header from "./Header";
import Movie from "./Movie";
import Footer from "./Footer";
import "./App.css";
import "./Reset.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24"
    );
    this.setState({ movies, isLoading: false });
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
            } = await axios.get(
              `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&page=${
                i + 1
              }`
            );
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

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loding...</span>
          </div>
        ) : (
          <div className="movies">
            <Header />
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
            <Footer />
          </div>
        )}
      </section>
    );
  }
}

export default App;
