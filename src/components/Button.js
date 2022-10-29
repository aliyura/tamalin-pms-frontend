import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button className="btn btn-outlined btn-success" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
