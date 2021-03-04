import React from "react";

function Header({ event }) {
  return (
    <header className="header">
      <h1 className="logo">JG Movies</h1>
      <nav className="gnb">
        <input type="checkbox" id="gnb_btn" />
        <label htmlFor="gnb_btn" className="menu_bar">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <ul>
          <li>
            <h2 data-genre="all" onClick={event}>
              Main
            </h2>
          </li>
          <li className="gnb_genres">
            <h2>Genre</h2>
            <ul className="sub_menu">
              <li>
                <p data-genre="action" onClick={event}>
                  Action
                </p>
              </li>
              <li>
                <p data-genre="thriller" onClick={event}>
                  Thriller
                </p>
              </li>
              <li>
                <p data-genre="romance" onClick={event}>
                  Romance
                </p>
              </li>
              <li>
                <p data-genre="comedy" onClick={event}>
                  Comedy
                </p>
              </li>
              <li>
                <p data-genre="animation" onClick={event}>
                  Animation
                </p>
              </li>
            </ul>
          </li>
          <li>
            <h2>Search</h2>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
