import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import "./Search.css";

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [apiUrl, setApiUrl] = useState(
    "https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24"
  );
  const [pageNumber, setPageNumber] = useState(1);
  const searchMount = useRef(true);

  const searchUseKey = async (props) => {
    const loader = document.querySelector(".loader_scroll");
    const {
      target: { value },
    } = props;
    const NEW_API_URL = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&query_term=${value}`;

    if (props.key === "Enter" && !loader.className.includes("show")) {
      try {
        loader.classList.add("show");
        await axios.get(NEW_API_URL);
        setApiUrl(NEW_API_URL);
      } finally {
        setPageNumber(1);
        loader.classList.remove("show");
      }
    }
  };

  const searchUseClick = async () => {
    const value = document.querySelector(".search_box input").value;
    const NEW_API_URL = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&query_term=${value}`;

    try {
      await axios.get(NEW_API_URL);
      setApiUrl(NEW_API_URL);
    } finally {
      setPageNumber(1);
    }
  };

  const getPage = async () => {
    const scrollTop = document.scrollingElement.scrollTop;
    const scrollBottom =
      document.scrollingElement.scrollHeight -
      document.scrollingElement.clientHeight -
      200;
    const numberOfMovie = movies.length;
    const loader = document.querySelector(".loader_scroll");
    if (
      scrollTop >= scrollBottom &&
      numberOfMovie === 24 * pageNumber &&
      !loader.className.includes("show")
    ) {
      loader.classList.add("show");
      try {
        const {
          data: {
            data: { movies: searchMovies },
          },
        } = await axios.get(`${apiUrl}&page=${pageNumber + 1}`);
        const newPage = movies.concat(searchMovies);
        const limitPage = 16;
        if (pageNumber < limitPage) {
          setPageNumber(pageNumber + 1);
          setMovies(newPage);
        }
      } finally {
        loader.classList.remove("show");
      }
    }
  };

  const scrollEvent = () => {
    document.addEventListener("scroll", getPage);
  };
  const removeScrollEvent = () => {
    document.removeEventListener("scroll", getPage);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const {
          data: {
            data: { movies },
          },
        } = await axios.get(apiUrl);
        if (movies === undefined) {
          console.log("그런거 없어요");
          setMovies([]);
        } else {
          setMovies(movies);
        }
      } catch {
        console.log("에러가 났어요");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchMount.current) {
      searchMount.current = false;
    } else {
      getMovies();
    }
  }, [apiUrl]);

  useEffect(() => {
    scrollEvent();
    return () => {
      removeScrollEvent();
    };
  });

  // useEffect(() => {
  //   const getMovies = async () => {
  //     try {
  //       const {
  //         data: {
  //           data: { movies },
  //         },
  //       } = await axios.get(apiUrl);
  //       if (movies === undefined) {
  //         console.log("그런거 없어요");
  //         setMovies([]);
  //       } else {
  //         setMovies(movies);
  //       }
  //     } catch {
  //       console.log("에러가 났어요");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getMovies();
  // }, [apiUrl]);

  // useEffect(() => {
  //   const getPage = async () => {
  //     const scrollTop = document.scrollingElement.scrollTop;
  //     const scrollBottom =
  //       document.scrollingElement.scrollHeight -
  //       document.scrollingElement.clientHeight -
  //       200;
  //     const numberOfMovie = movies.length;
  //     const loader = document.querySelector(".loader_scroll");
  //     if (
  //       scrollTop >= scrollBottom &&
  //       numberOfMovie === 24 * pageNumber &&
  //       !loader.className.includes("show")
  //     ) {
  //       loader.classList.add("show");
  //       try {
  //         const {
  //           data: {
  //             data: { movies: searchMovies },
  //           },
  //         } = await axios.get(`${apiUrl}&page=${pageNumber + 1}`);
  //         const newPage = movies.concat(searchMovies);
  //         const limitPage = 16;
  //         if (pageNumber < limitPage) {
  //           setPageNumber((pageNumber) => pageNumber + 1);
  //           console.log("aaa");
  //           setMovies(newPage);
  //         }
  //       } finally {
  //         loader.classList.remove("show");
  //       }
  //     }
  //   };

  //   const scrollEvent = () => {
  //     document.addEventListener("scroll", getPage);
  //   };

  //   scrollEvent();

  //   return () => {
  //     const removeScrollEvent = () => {
  //       document.removeEventListener("scroll", getPage);
  //     };

  //     removeScrollEvent();
  //   };
  // });

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
