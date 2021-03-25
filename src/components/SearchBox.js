import React from "react";
import "../css/SearchBox.css";
import PropTyeps from "prop-types";

function SearchBox({ searchUseKey, searchUseClick }) {
  return (
    <div className="search_box" action="#">
      <input
        type="search"
        placeholder="Search movies..."
        autoComplete="off"
        onKeyUp={searchUseKey}
        required
      />
      <span className="search_boder_bottom"></span>
      <button onClick={searchUseClick}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

SearchBox.propTypes = {
  searchUseKey: PropTyeps.func.isRequired,
  searchUseClick: PropTyeps.func.isRequired,
};

export default SearchBox;
