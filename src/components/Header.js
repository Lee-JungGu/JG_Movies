import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const moveTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={moveTop}>
        <Link to="/">JG Movies</Link>
      </h1>
      <nav className="gnb">
        <ul>
          <li onClick={moveTop}>
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
          </li>

          <li onClick={moveTop}>
            <Link to="/Search">
              <i className="fas fa-search"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
