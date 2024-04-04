import React from "react";

interface ErrorModalProps {
  errorMsg: string;
}

function ErrorModal({ errorMsg }: ErrorModalProps) {
  return (
    <div className="modal-con">
      <div className="modal-content-centered">
        <h2 className="modal-title">Sorry</h2>
        <div className="base-text">{errorMsg}</div>
      </div>
    </div>
  );
}

export default ErrorModal;
