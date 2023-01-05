import React from "react";
import Cloud from "../Cloud/Cloud";

function Background() {
  return (
    <div className="background-con">
      <div className="sun"></div>
      <Cloud cloudClass="small-cloud" />
      <Cloud cloudClass="large-cloud" />
    </div>
  );
}

export default Background;
