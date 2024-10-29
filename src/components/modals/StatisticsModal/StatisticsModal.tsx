import { useEffect, useState, useContext } from "react";
import { StatsData } from "../../../types/types";
import { calculatePercentage } from "../../../utilities/helpers";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";
import { numberOfTries } from "../../../data/constants";
import { AppContext } from "../../../context/context";

function StatisticsModal() {
  const { setIsStatisticsModalOpen, statistics } = useContext(AppContext);
  const [gameCount, setGameCount] = useState(0);
  const [winPercent, setWinPercent] = useState(0);
  const [barChartData, setBarChartData] = useState<number[]>([]);

  const closeModal = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsStatisticsModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  });

  const calculateWinPercentage = (statisticsData: StatsData[]) => {
    const timesPlayed = statisticsData.length;
    if (timesPlayed === 0) {
      return 0;
    }
    const timesWon = statisticsData.filter(
      (currentStat) => currentStat.guessed
    ).length;
    return calculatePercentage(timesWon, timesPlayed);
  };

  const calculateBarChartPercentage = (
    statisticsData: StatsData[]
  ): number[] => {
    const barChartData: number[] = [];
    const timesWon = statisticsData.filter(
      (currentData) => currentData.guessed
    ).length;

    for (let i = 0; i < numberOfTries; i++) {
      const currentGuessedAtCount = statisticsData.filter(
        (currentData) => currentData.guessedAt === i + 1
      ).length;

      const currentGuessedAtPercentage = calculatePercentage(
        currentGuessedAtCount,
        timesWon
      );

      barChartData[i] = currentGuessedAtPercentage;
    }

    return barChartData;
  };

  useEffect(() => {
    setGameCount(statistics.length);
    setWinPercent(calculateWinPercentage(statistics));
    setBarChartData(calculateBarChartPercentage(statistics));
  }, [statistics]);

  return (
    <ModalContainer
      modalTitle="Statistics"
      handleCancel={() => {
        setIsStatisticsModalOpen(false);
      }}
      modalContentStyle="modal-content-statistics"
    >
      <div className="statistics-summary-container">
        <div className="statistics-summary-box">
          <span className="text-subtitle">played</span>
          <span className="text-input-large">{gameCount}</span>
        </div>
        <div className="statistics-summary-box">
          <span className="text-subtitle">Win %</span>
          <span className="text-input-large">{winPercent}</span>
        </div>
      </div>
      <p className="text-subtitle">Guess distribution</p>
      <div className="statistics-chart-container">
        {barChartData.map((current, index) => {
          return (
            <div className="bar-chart-container" key={index}>
              <div className="bar-chart" style={{ height: current + "%" }}>
                <div className="text-normal bar-chart-percentage">
                  {current}%
                </div>
              </div>
              <div className="text-subtitle bar-chart-number">{index + 1}</div>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}

export default StatisticsModal;
