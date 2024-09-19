import React from "react";
import PageWrapper from "../../templates/PageWrapper/PageWrapper";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

function ErrorPage() {
  return (
    <PageWrapper>
      <ModalContainer
        modalTitle="Sorry"
        modalText="Unexpected error. Refresh the page or try again later."
      />
    </PageWrapper>
  );
}

export default ErrorPage;
