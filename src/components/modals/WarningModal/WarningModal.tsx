import React from "react";

interface WarningModalProps {
  warningMsg: string;
}

function WarningModal({ warningMsg }: WarningModalProps) {
  return (
    <div className="modal-con-secondary fade-out-animation">
      <div className="modal-content-warning">
        <div className="text-normal">{warningMsg}</div>
      </div>
    </div>
  );
}

export default WarningModal;
