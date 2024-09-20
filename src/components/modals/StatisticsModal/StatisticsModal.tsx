import React, { useEffect, useState } from "react";
import { StatsData } from "../../../types/types";
import { getStats } from "../../../utilities/helpers";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

interface StatisticsModalProps {
  closeStatistics: () => void;
}

function StatisticsModal({ closeStatistics }: StatisticsModalProps) {
  const [timesPlayed, setTimesPlayed] = useState(0);
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

  const calcWinPer = (data: StatsData[]) => {
    const timesPlayed = data.length;
    if (timesPlayed === 0) {
      return 0;
    } else {
      const timesWon = data.filter((currentData) => currentData.guessed);
      return Math.round((timesWon.length / timesPlayed) * 100);
    }
  };

  const calcBarPer = (data: StatsData[]): number[] => {
    const temp = [0, 0, 0, 0, 0];
    const timesWon = data.filter((currentData) => currentData.guessed);
    if (timesWon.length === 0) {
      return temp;
    } else {
      timesWon.map((current) => {
        if (current.guessedAt) {
          temp[current.guessedAt - 1] = temp[current.guessedAt - 1] + 1;
        }
      });

      const chartData = temp.map((current) =>
        Math.round((current / timesWon.length) * 100)
      );

      return chartData;
    }
  };

  useEffect(() => {
    const savedStatistics = getStats();
    setTimesPlayed(savedStatistics.length);
    setWinPercent(calcWinPer(savedStatistics));
    setBarChartData(calcBarPer(savedStatistics));
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
          <span className="text-input-large">{timesPlayed}</span>
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
