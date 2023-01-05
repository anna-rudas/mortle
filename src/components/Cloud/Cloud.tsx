import React from "react";

interface CloudProps {
  cloudClass: string;
}

function Cloud({ cloudClass }: CloudProps) {
  return (
    <div className={cloudClass}>
      <div className="cloud-pt-1"></div>
      <div className="cloud-pt-2"></div>
      <div className="cloud-pt-3"></div>
      <div className="cloud-bottom"></div>
    </div>
  );
}

export default Cloud;
