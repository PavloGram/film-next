import React from "react";

function Button({ btnValue, modClx, actClx, clickFunction, twoClickFunction }) {
  return (
    <button
      type="button"
      className={`btn ${actClx} ${modClx}`}
      onClick={clickFunction}
      
    >
      {btnValue}
    </button>
  );
}

export default Button;
