interface CloudProps {
  size: "small" | "large";
}

function Cloud({ size }: CloudProps) {
  return (
    <div className={`${size}-cloud`}>
      <div className="cloud-pt-1"></div>
      <div className="cloud-pt-2"></div>
      <div className="cloud-pt-3"></div>
      <div className="cloud-bottom"></div>
    </div>
  );
}

export default Cloud;
