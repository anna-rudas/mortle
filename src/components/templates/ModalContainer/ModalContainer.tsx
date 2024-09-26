import React from "react";
import CloseButton from "../../buttons/CloseButton/CloseButton";

interface ModalContainerProps {
  modalTitle?: string;
  modalText?: string;
  children?: JSX.Element[] | JSX.Element;
  handleCancel?: { (): void } | null;
  modalContentStyle?: string;
  modalContainerStyle?: string;
}

function ModalContainer({
  modalTitle,
  modalText,
  children,
  handleCancel,
  modalContentStyle = "",
  modalContainerStyle = "",
}: ModalContainerProps) {
  return (
    <>
      {handleCancel ? (
        <div className={`modal-container ${modalContainerStyle}`}>
          <div className={`modal-content-info ${modalContentStyle}`}>
            <CloseButton handleClick={handleCancel} />
            <span className="text-title">{modalTitle}</span>
            {children}
          </div>
        </div>
      ) : (
        <div className="modal-container">
          <div className="modal-content-centered">
            {modalTitle && <span className="text-title">{modalTitle}</span>}
            {modalText && <span className="text-normal">{modalText}</span>}
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default ModalContainer;
