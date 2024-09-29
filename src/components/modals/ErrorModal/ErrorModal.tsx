import React from "react";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

interface ErrorModalProps {
  errorMessage: string;
}

function ErrorModal({ errorMessage }: ErrorModalProps) {
  return <ModalContainer modalTitle="Sorry" modalText={errorMessage} />;
}

export default ErrorModal;
