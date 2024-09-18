import React from "react";

interface PrimaryButtonProps {
  handleClick: () => void;
  buttonText: string;
}

function PrimaryButton({ handleClick, buttonText }: PrimaryButtonProps) {
  return (
    <button className="btn-primary" onClick={handleClick}>
      {buttonText}
    </button>
  );
}

export default PrimaryButton;
