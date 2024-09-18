import React from "react";
import Cloud from "../Cloud/Cloud";
import Hills from "../Hills/Hills";

function Background() {
  return (
    <div className="background-con">
      <div className="sun"></div>
      <Cloud size="small" />
      <Cloud size="large" />
      <Hills />
    </div>
  );
}

export default Background;
