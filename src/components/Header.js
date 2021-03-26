import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/" replace>
          JG Movies
        </Link>
      </h1>
      <nav className="gnb">
        <ul>
          <li>
            <Link to="/" replace>
              <i className="fas fa-home"></i>
            </Link>
          </li>

          <li>
            <Link to="/Search" replace>
              <i className="fas fa-search"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
