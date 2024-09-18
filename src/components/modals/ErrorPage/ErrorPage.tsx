import React from "react";
import Background from "../../features/Background/Background";

function ErrorPage() {
  return (
    <div className="wrapper">
      <Background />
      <div className="modal-con">
        <div className="modal-content-centered">
          <h2 className="modal-title">Sorry</h2>
          <div className="base-text">
            Unexpected error. Refresh the page or try again later.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
