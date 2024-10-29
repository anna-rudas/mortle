import PageWrapper from "../../templates/PageWrapper/PageWrapper";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";
import { generalErrorMsg } from "../../../data/constants";

interface ErrorPageProps {
  error: Error;
}

function ErrorPage({ error }: ErrorPageProps) {
  return (
    <PageWrapper>
      <ModalContainer
        modalTitle="Sorry"
        modalText={error.message ?? generalErrorMsg}
      />
    </PageWrapper>
  );
}

export default ErrorPage;
