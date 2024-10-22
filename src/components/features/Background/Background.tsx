import Cloud from "../../background-elements/Cloud/Cloud";
import Hills from "../../background-elements/Hills/Hills";

function Background() {
  return (
    <div className="background-container">
      <div className="background-sun"></div>
      <Cloud size="small" />
      <Cloud size="large" />
      <Hills />
    </div>
  );
}

export default Background;
