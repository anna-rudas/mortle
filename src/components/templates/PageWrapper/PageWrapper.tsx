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
    </div>
  );
}

export default PageWrapper;
