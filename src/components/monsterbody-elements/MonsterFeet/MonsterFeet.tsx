interface MonsterFeetProps {
  monsterType: "game" | "keyboard";
  size?: "large" | "small";
}

function MonsterFeet({ monsterType, size = "large" }: MonsterFeetProps) {
  return (
    <div className={`feet-container-${size}`}>
      <div className={`foot-${size}`}>
        <div className={`${monsterType}-left-vertical-part`}></div>
        <div className={`${monsterType}-left-horizontal-part`}></div>
      </div>
      <div className={`foot-${size}`}>
        <div className={`${monsterType}-right-vertical-part`}></div>
        <div className={`${monsterType}-right-horizontal-part`}></div>
      </div>
    </div>
  );
}

export default MonsterFeet;
