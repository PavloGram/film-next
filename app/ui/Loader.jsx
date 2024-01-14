import React from "react";

function Loader({actClx}) {
  return (
    <div className={`loader-wrap ${actClx}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Loader;
