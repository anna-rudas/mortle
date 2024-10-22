import CloseIcon from "../../../assets/icons/CloseIcon";

interface CloseButtonProps {
  handleClick: () => void;
}

function CloseButton({ handleClick }: CloseButtonProps) {
  return (
    <button className="btn-close" onClick={handleClick}>
      <CloseIcon />
    </button>
  );
}

export default CloseButton;
