import React from "react";
import PropTypes from "prop-types";

function Loader({ name }) {
  return (
    <div className={name}>
      <span className="loader_text">Loding...</span>
    </div>
  );
}

Loader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Loader;
