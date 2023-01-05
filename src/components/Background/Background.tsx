import React from "react";
import Cloud from "../Cloud/Cloud";
import Hills from "../Hills/Hills";

function Background() {
  return (
    <div className="background-con">
      <div className="sun"></div>
      <Cloud cloudClass="small-cloud" />
      <Cloud cloudClass="large-cloud" />
      <Hills />
    </div>
  );
}

export default Background;
