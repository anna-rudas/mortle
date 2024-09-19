import React, { useEffect, useState } from "react";
import { StatsData } from "../../../types/types";
import { getStats } from "../../../utilities/helpers";
import CloseButton from "../../buttons/CloseButton/CloseButton";

interface StatisticsModalProps {
  closeStatistics: () => void;
}

function StatisticsModal({ closeStatistics }: StatisticsModalProps) {
  const [timesPlayed, setTimesPlayed] = useState(0);
  const [winPercent, setWinPercent] = useState(0);
  const [barChartData, setBarChartData] = useState<number[]>([]);

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeStatistics();
      }
    };
    window.removeEventListener("keydown", closeModal);
    window.addEventListener("keydown", closeModal);
  });

  const calcWinPer = (data: StatsData[]) => {
    const timesPlayed = data.length;
    if (timesPlayed == 0) {
      return 0;
    } else {
      const timesWon = data.filter((currentData) => currentData.guessed);
      return Math.round((timesWon.length / timesPlayed) * 100);
    }
  };

  const calcBarPer = (data: StatsData[]): number[] => {
    const temp = [0, 0, 0, 0, 0];
    const timesWon = data.filter((currentData) => currentData.guessed);
    if (timesWon.length == 0) {
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
    <div className="modal-con">
      <div className="modal-content-statistics">
        <CloseButton handleClick={closeStatistics} />
        <h2 className="text-title">Statistics</h2>
        <div className="statistics-sum-con">
          <div className="statistics-box">
            <div className="text-subtitle">played</div>
            <div className="text-input-large">{timesPlayed}</div>
          </div>
          <div className="statistics-box">
            <div className="text-subtitle">Win %</div>
            <div className="text-input-large">{winPercent}</div>
          </div>
        </div>
        <p className="text-subtitle">Guess distribution</p>
        <div className="chart-con">
          {barChartData.map((current, index) => {
            return (
              <div className="bar-con" key={index}>
                <div className="bar" style={{ height: current + "%" }}>
                  <div className="text-normal bar-percentage">{current}%</div>
                </div>
                <div className="text-subtitle bar-chart-number">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StatisticsModal;
