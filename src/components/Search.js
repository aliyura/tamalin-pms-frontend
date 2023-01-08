import React from "react";

const Search = ({ placeholder, onChange, onClick, ref }) => {
  return (
    <div className="input-group mb-3">
      <input
        ref={ref}
        type="text"
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-success" type="button"
        onClick={onClick}
        >
          <i className="fa fa-search text-success"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;
