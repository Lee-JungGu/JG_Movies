import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">JG Movies</h1>
      <nav className="gnb">
        <div className="menu_bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <li>Home</li>
          <li>Favorite</li>
          <li>Adult</li>
          <li>Kids</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
