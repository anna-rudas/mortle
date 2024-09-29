import React from "react";
import Background from "../../features/Background/Background";

interface PageWrapperProps {
  children?: JSX.Element[] | JSX.Element;
}

function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="wrapper">
      <Background />
      {children}
      <footer className="page-footer text-normal">
        made by
        <a target="_blank" rel="noreferrer" href="https://annarudas.com/">
          anna
        </a>
      </footer>
    </div>
  );
}

export default PageWrapper;
