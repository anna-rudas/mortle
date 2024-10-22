import { useContext } from "react";
import MonsterContainer from "../../features/MonsterContainer/MonsterContainer";
import Header from "../../features/Header/Header";
import HowToPlayModal from "../../modals/HowToPlayModal/HowToPlayModal";
import StatisticsModal from "../../modals/StatisticsModal/StatisticsModal";
import { AppContext } from "../../../context/context";

function GameContent() {
  const { isLoading, isStatisticsModalOpen, isHowToPlayModalOpen } =
    useContext(AppContext);
  return (
    <div className="game-content">
      <Header />
      {!isLoading && <MonsterContainer />}
      {isHowToPlayModalOpen && <HowToPlayModal />}
      {isStatisticsModalOpen && <StatisticsModal />}
    </div>
  );
}

export default GameContent;
