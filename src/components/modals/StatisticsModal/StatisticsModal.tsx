import React, { useEffect, useState } from "react";
import { StatsData } from "../../../types/types";
import { calculatePercentage, getStats } from "../../../utilities/helpers";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";
import { numberOfTries } from "../../../data/constants";

interface StatisticsModalProps {
  closeStatistics: () => void;
}

function StatisticsModal({ closeStatistics }: StatisticsModalProps) {
  const [gameCount, setGameCount] = useState(0);
  const [winPercent, setWinPercent] = useState(0);
  const [barChartData, setBarChartData] = useState<number[]>([]);

  const closeModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeStatistics();
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
    const savedStatistics = getStats();
    setGameCount(savedStatistics.length);
    setWinPercent(calculateWinPercentage(savedStatistics));
    setBarChartData(calculateBarChartPercentage(savedStatistics));
  }, []);

  return (
    <ModalContainer
      modalTitle="Statistics"
      handleCancel={closeStatistics}
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
