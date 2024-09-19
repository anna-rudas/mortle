import React from "react";

interface WarningModalProps {
  warningMsg: string;
}

function WarningModal({ warningMsg }: WarningModalProps) {
  return (
    <div className="warning-modal-container fade-out-animation">
      <div className="warning-modal-content">
        <div className="text-normal">{warningMsg}</div>
      </div>
    </div>
  );
}

export default WarningModal;
