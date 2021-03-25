import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import "../css/Search.css";

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [apiUrl, setApiUrl] = useState(
    "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24"
  );
  const [pageNumber, setPageNumber] = useState(1);
  const firstMounted = useRef(true);
  const isMounted = useRef(true);

  //API URL에 검색어를 적용시키는 함수
  const getSearchPage = async (value) => {
    const loader = document.querySelector(".loader_scroll");
    const NEW_API_URL = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&query_term=${value}`;
    if (!loader.className.includes("show") && value !== "") {
      loader.classList.add("show");
      await axios.get(NEW_API_URL);
      if (isMounted.current) {
        setApiUrl(NEW_API_URL);
        setPageNumber(1);
      }
      loader.classList.remove("show");
    }
  };
  // 엔터키로 검색하는 함수
  const searchUseKey = async (props) => {
    const {
      target: { value },
    } = props;

    props.key === "Enter" && getSearchPage(value);
  };
  // 검색 버튼으로 검색하는 함수
  const searchUseClick = () => {
    const value = document.querySelector(".search_box input").value;
    getSearchPage(value);
  };

  //스크롤이 하단에 있을때 추가 영화를 가져오는 함수
  const getMoviePage = async () => {
    const BOTTOM_SPACE = 200;
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollBottom =
      document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      BOTTOM_SPACE;
    const loader = document.querySelector(".loader_scroll");
    const MOVIES_PER_PAGE = 24;
    if (
      scrollTop >= scrollBottom &&
      movies.length === MOVIES_PER_PAGE * pageNumber &&
      !loader.className.includes("show")
    ) {
      loader.classList.add("show");
      const {
        data: {
          data: { movies: searchMovies },
        },
      } = await axios.get(`${apiUrl}&page=${pageNumber + 1}`);
      const newPage = [...movies, ...searchMovies];
      const limitPage = 16;

      if (pageNumber < limitPage && isMounted.current) {
        setPageNumber(pageNumber + 1);
        setMovies(newPage);
      }
      loader.classList.remove("show");
    }
  };

  const scrollEvent = () => {
    document.addEventListener("scroll", getMoviePage);
  };

  const removeScrollEvent = () => {
    document.removeEventListener("scroll", getMoviePage);
  };

  useEffect(() => {
    scrollEvent();
    return () => {
      removeScrollEvent();
    };
  });

  // 검색시 해당 영화를 보여주고 없을시 빈 화면 출력
  useEffect(() => {
    const getMovies = async () => {
      const {
        data: {
          data: { movies },
        },
      } = await axios.get(apiUrl);
      if (movies === undefined) return setMovies([]);
      if (isMounted.current) {
        setMovies(movies);
        setIsLoading(false);
      }
    };

    if (firstMounted.current) return (firstMounted.current = false);
    getMovies();
  }, [apiUrl]);

  // 비동기 작업 중 페이지 이동시 오류 방지
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section className="container_sc">
      <SearchBox searchUseKey={searchUseKey} searchUseClick={searchUseClick} />
      <Loader name={"loader_scroll"} />
      {isLoading ? (
        <div></div>
      ) : (
        <div className="contents">
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

export default Search;
