import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import "../css/Search.css"; // Main.css에 중복되는 부분 있음.

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(
    () => JSON.parse(localStorage.getItem("movies_search")) || []
  );
  const [apiUrl, setApiUrl] = useState(
    () =>
      localStorage.getItem("apiUrl_search") ||
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24"
  );
  const [pageNumber, setPageNumber] = useState(
    movies.length !== 0 ? movies.length / 24 : 1
  );
  const firstMounted = useRef(true);
  const isMounted = useRef(true);

  //API URL에 검색어를 적용시키는 함수
  const getSearchPage = async (value) => {
    const NEW_API_URL = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&query_term=${value}`;
    if (!isLoading && value !== "") {
      setIsLoading(true);
      await axios.get(NEW_API_URL);
      if (isMounted.current) {
        setApiUrl(NEW_API_URL);
        setPageNumber(1);
      }
      setIsLoading(false);
      window.scrollTo(0, 0);
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
    //시작 로딩일때 작동 안함
    if (isLoading) return;

    const BOTTOM_SPACE = 200;
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollBottom =
      document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      BOTTOM_SPACE;
    const loader = document.querySelector(".loader_scroll");
    const checkLoader = loader.className.includes("show");
    const MOVIES_PER_PAGE = 24;

    if (
      scrollTop >= scrollBottom &&
      movies.length === MOVIES_PER_PAGE * pageNumber &&
      movies.length % MOVIES_PER_PAGE === 0 &&
      !checkLoader
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

  //비동기로 작업할때 loader의 className을 인지하지 못하는 오류를 개선
  useLayoutEffect(() => {
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
      const notFindMsg = document.querySelector(".search_massage_box");

      if (movies === undefined) {
        notFindMsg.innerHTML = "No related movies..";
        setMovies([]);
      } else if (isMounted.current) {
        setMovies(movies);
        setIsLoading(false);
        notFindMsg.classList.add("hide");
      }
    };

    if (firstMounted.current) return (firstMounted.current = false);
    getMovies();
  }, [apiUrl]);

  useEffect(() => {
    window.localStorage.setItem("movies_search", JSON.stringify(movies));
    window.localStorage.setItem("apiUrl_search", apiUrl);
  }, [movies, apiUrl]);

  useLayoutEffect(() => {
    const lastScrollPosition = localStorage.getItem(
      "lastScrollPosition_search"
    );
    lastScrollPosition
      ? window.scrollTo(0, lastScrollPosition)
      : window.scrollTo(0, 0);
    return () => {
      window.localStorage.setItem(
        "lastScrollPosition_search",
        document.scrollingElement.scrollTop
      );
    };
  }, []);

  useEffect(() => {
    const notFindMsg = document.querySelector(".search_massage_box");

    if (movies.length !== 0) {
      notFindMsg.classList.add("hide");
    }
    return () => {
      // 비동기 작업 중 페이지 이동시 오류 방지
      isMounted.current = false;
    };
  }, []);

  return (
    <section className="container_sc">
      <SearchBox searchUseKey={searchUseKey} searchUseClick={searchUseClick} />
      {isLoading ? (
        <Loader name={"loader"} />
      ) : (
        <div className="contents">
          <Loader name={"loader_scroll"} />
          <div className="search_massage_box">
            <p className="search_massage"></p>
          </div>
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
