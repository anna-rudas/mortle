import React from "react";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

interface ErrorModalProps {
  errorMsg: string;
}

function ErrorModal({ errorMsg }: ErrorModalProps) {
  return <ModalContainer modalTitle="Sorry" modalText={errorMsg} />;
}

export default ErrorModal;
