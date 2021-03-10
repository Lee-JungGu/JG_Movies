import React from "react";
import "./SearchBox.css";
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
