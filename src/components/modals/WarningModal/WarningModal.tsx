interface WarningModalProps {
  warningMessage: string;
}

function WarningModal({ warningMessage }: WarningModalProps) {
  return (
    <div className="warning-modal-container fade-out-animation">
      <div className="warning-modal-content">
        <div className="text-normal">{warningMessage}</div>
      </div>
    </div>
  );
}

export default WarningModal;
