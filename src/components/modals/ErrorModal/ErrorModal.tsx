import React from "react";

interface ErrorModalProps {
  errorMsg: string;
}

function ErrorModal({ errorMsg }: ErrorModalProps) {
  return (
    <div className="modal-con">
      <div className="modal-content-centered">
        <h2 className="text-title">Sorry</h2>
        <div className="text-normal">{errorMsg}</div>
      </div>
    </div>
  );
}

export default ErrorModal;
