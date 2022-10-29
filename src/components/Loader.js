import React from "react";
import ReactLoading from "react-loading";
import "../static/css/loader.css";

const Loader = ({ type, color }) => (
  <div className="loader custom-loading-container">
    <ReactLoading
      className="loading-component"
      type={type ? type : "balls"}
      color={color ? color : "#15283c"}
      height={"10%"}
      width={"10%"}
    />
  </div>
);
export default Loader;
