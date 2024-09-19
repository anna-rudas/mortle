import React from "react";
import PageWrapper from "../../templates/PageWrapper/PageWrapper";

function ErrorPage() {
  return (
    <PageWrapper>
      <div className="modal-con">
        <div className="modal-content-centered">
          <h2 className="text-title">Sorry</h2>
          <div className="text-normal">
            Unexpected error. Refresh the page or try again later.
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ErrorPage;
