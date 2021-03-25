import React from "react";
import axios from "axios";
import Genre from "../components/Genre";
import Loader from "../components/Loader";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import "../css/Main.css";
import "../css/Reset.css";

class Main extends React.Component {
  _isMounted = true;

  state = {
    isLoading: true,
    movies: [],
    apiUrl:
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=all",
    pageNumber: 1,
  };

  //영화를 가져오는 함수
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(this.state.apiUrl);
    if (this._isMounted) {
      this.setState({ isLoading: false, movies });
    }
  };

  //클릭시 해당 장르 영와를 가져오는 함수
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

    this.animateScrollTop(0, 0);
    this.setState({ pageNumber: 1 });
  };

  //부드러운 마우스 스크롤 탑 애니메이션
  animateScrollTop = (x, y) => {
    window.scroll({
      top: x,
      left: y,
      behavior: "smooth",
    });
  };

  //스크롤이 하단에 있을때 추가 영화를 가져오는 함수
  getMoviePage = async () => {
    const BOTTOM_SPACE = 200;
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollBottom =
      document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      BOTTOM_SPACE;
    const numberOfMovie = this.state.movies.length;
    const pageNumber = this.state.pageNumber;
    const loader = document.querySelector(".loader_scroll");
    const isLoading = this.state.isLoading;
    const checkLoading = loader.className.includes("show");
    const MOVIES_PER_PAGE = 24;

    if (
      scrollTop >= scrollBottom &&
      numberOfMovie === MOVIES_PER_PAGE * pageNumber &&
      !checkLoading &&
      !isLoading
    ) {
      loader.classList.add("show");
      const {
        data: {
          data: { movies },
        },
      } = await axios.get(`${this.state.apiUrl}&page=${pageNumber + 1}`);
      const newPage = [...this.state.movies, ...movies];
      const limitPage = 16;
      pageNumber < limitPage &&
        this._isMounted &&
        this.setState({ movies: newPage, pageNumber: pageNumber + 1 });
      loader.classList.remove("show");
    }
  };

  scrollEvent = () => {
    document.addEventListener("scroll", this.getMoviePage);
  };

  removeScrollEvent = () => {
    document.removeEventListener("scroll", this.getMoviePage);
  };

  async componentDidMount() {
    const movies = await JSON.parse(localStorage.getItem("movies"));
    const apiUrl = localStorage.getItem("apiUrl");
    const lastScrollPosition = localStorage.getItem("lastScrollPosition");
    movies.length === 0
      ? this.getMovies()
      : this.setState({
          movies,
          isLoading: false,
          pageNumber: movies.length / 24,
          apiUrl,
        });
    window.scrollTo(0, lastScrollPosition);
    console.log(this.state.movies);
    console.log(lastScrollPosition);
    this.scrollEvent();
  }

  componentDidUpdate() {
    this.state.isLoading && this.getMovies();
  }

  componentWillUnmount() {
    this.removeScrollEvent();
    localStorage.setItem("movies", JSON.stringify(this.state.movies));
    localStorage.setItem("apiUrl", this.state.apiUrl);
    localStorage.setItem(
      "lastScrollPosition",
      document.scrollingElement.scrollTop
    );
    // 비동기 작업 중 페이지 이동시 오류 방지
    this._isMounted = false;
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
