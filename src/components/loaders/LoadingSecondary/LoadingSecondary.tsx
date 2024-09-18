import React from "react";

function LoadingSecondary() {
  return (
    <div className="modal-con modal-con-no-bg ">
      <div className="modal-content-loading">
        <div className="loading-square anim-delay-1s"></div>
        <div className="loading-square anim-delay-2s"></div>
        <div className="loading-square anim-delay-3s"></div>
        <div className="loading-square anim-delay-4s"></div>
      </div>
    </div>
  );
}

export default LoadingSecondary;
