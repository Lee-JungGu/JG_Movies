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
    genre: "all",
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
        genre,
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

  activeMenu = () => {
    const genres = document.querySelectorAll(".genre_menu ul li");
    genres.forEach((genre) => {
      genre.children[0].dataset.genre === this.state.genre &&
        genre.children[0].classList.add("active_text_color");
    });
  };

  //스크롤이 하단에 있을때 추가 영화를 가져오는 함수
  getMoviePage = async () => {
    if (this.state.isLoading) return;

    const BOTTOM_SPACE = 200;
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollBottom =
      document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      BOTTOM_SPACE;
    const numberOfMovie = this.state.movies.length;
    const pageNumber = this.state.pageNumber;
    const loader = document.querySelector(".loader_scroll");
    const checkLoading = loader.className.includes("show");
    const MOVIES_PER_PAGE = 24;

    if (
      scrollTop >= scrollBottom &&
      numberOfMovie === MOVIES_PER_PAGE * pageNumber &&
      numberOfMovie % MOVIES_PER_PAGE === 0 &&
      !checkLoading
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
    this.activeMenu();
    //로컬스토리지에 저장한 데이터를 받아옴
    const movies = await JSON.parse(localStorage.getItem("movies"));
    const apiUrl = localStorage.getItem("apiUrl");
    const genre = localStorage.getItem("genre");
    const lastScrollPosition = localStorage.getItem("lastScrollPosition");
    //로컬스토리지에 저장한 데이터를 이용해 API를 불필요하게 받아오는 것 방지
    movies === null
      ? this.getMovies()
      : this.setState({
          movies,
          isLoading: false,
          pageNumber: movies.length / 24,
          apiUrl,
          genre,
        });
    window.scrollTo(0, lastScrollPosition);
  }

  componentDidUpdate() {
    this.activeMenu();
    this.scrollEvent();
    this.state.isLoading && this.getMovies();
  }

  componentWillUnmount() {
    //현재까지 받은 정보들을 로컬스토리지에 저장
    localStorage.setItem("movies", JSON.stringify(this.state.movies));
    localStorage.setItem("apiUrl", this.state.apiUrl);
    localStorage.setItem("genre", this.state.genre);
    localStorage.setItem(
      "lastScrollPosition",
      document.scrollingElement.scrollTop
    );

    this.removeScrollEvent();
    // 비동기 작업 중 페이지 이동시 오류 방지
    this._isMounted = false;
  }

  render() {
    const { isLoading, movies } = this.state;

    return (
      <section className="container">
        {isLoading ? (
          <Loader name={"loader"} />
        ) : (
          <div className="contents">
            <Genre getGenre={this.clickGetGenre} />
            <Loader name={"loader_scroll"} />
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
