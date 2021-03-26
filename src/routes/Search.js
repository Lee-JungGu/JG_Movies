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
    () => localStorage.getItem("apiUrl_search") || ""
  );
  const [pageNumber, setPageNumber] = useState(
    movies.length !== 0 ? movies.length / 24 : 1
  ); //나누기 24는 1페이지당 출력되는 영화 개수
  const firstMounted = useRef(true);
  const isMounted = useRef(true);

  //API URL에 검색어를 적용
  const getSearchPage = async (value) => {
    const NEW_API_URL = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&query_term=${value}`;
    if (!isLoading && value !== "" && NEW_API_URL !== apiUrl) {
      setIsLoading(true);
      await axios.get(NEW_API_URL);
      setApiUrl(NEW_API_URL);
      setPageNumber(1);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }
  };
  // 엔터키로 검색
  const searchUseKey = async (props) => {
    const {
      target: { value },
    } = props;
    props.key === "Enter" && getSearchPage(value);
  };
  // 검색 버튼 클릭으로 검색
  const searchUseClick = () => {
    const value = document.querySelector(".search_box input").value;
    getSearchPage(value);
  };

  //스크롤이 하단에 있을때 추가 영화를 가져오는 함수
  const getMoviePage = async () => {
    //검색시 로딩일때 작동을 막아 비동기 작업중 페이지 전환 오류 해결
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
      const limitPage = 16;

      if (pageNumber < limitPage && isMounted.current) {
        setPageNumber(pageNumber + 1);
        setMovies([...movies, ...searchMovies]);
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

  //동기적으로 작동시켜 비동기 작업 중 페이지 전환 오류를 해결
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

      if (movies === undefined) {
        setMovies([]);
      } else if (isMounted.current) {
        setMovies(movies);
        setIsLoading(false);
      }
    };
    //첫번째로 마운트 됐을때 작동 방지
    if (firstMounted.current) return (firstMounted.current = false);
    getMovies();
  }, [apiUrl]);

  //현재 movies와 API URL 정보 저장
  useEffect(() => {
    window.localStorage.setItem("movies_search", JSON.stringify(movies));
    window.localStorage.setItem("apiUrl_search", apiUrl);
  }, [movies, apiUrl]);

  //페이지 전환시 마지막 스크롤 위치 저장 및 돌아왔을때 위치 적용
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

      //검색 및 스크롤을 통한 비동기 작업 중 페이지 전환시 오류 방지
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const notFindMsg = document.querySelector(".search_massage_box");
    movies.length !== 0 && notFindMsg.classList.add("hide");

    if (!firstMounted.current)
      return (notFindMsg.innerHTML = "No related movies..");
  }, [movies]);

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
