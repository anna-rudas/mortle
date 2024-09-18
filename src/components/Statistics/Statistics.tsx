import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import { StatsData } from "../../types/types";
import { getStats } from "../../utilities/helpers";

interface HowToPlayProps {
  closeStatistics: () => void;
}

function Statistics({ closeStatistics }: HowToPlayProps) {
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
        <button className="btn-close" onClick={closeStatistics}>
          <CloseIcon />
        </button>
        <h2 className="modal-title">Statistics</h2>
        <div className="statistics-sum-con">
          <div className="statistics-box">
            <div className="box-text">played</div>
            <div className="box-number">{timesPlayed}</div>
          </div>
          <div className="statistics-box">
            <div className="box-text">Win %</div>
            <div className="box-number">{winPercent}</div>
          </div>
        </div>
        <p className="chart-title">Guess distribution</p>
        <div className="chart-con">
          {barChartData.map((current, index) => {
            return (
              <div className="bar-con" key={index}>
                <div className="bar" style={{ height: current + "%" }}>
                  <div className="bar-percentage">{current}%</div>
                </div>
                <div className="bar-chart-number">{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
