import React, { useEffect, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { dummyData } from "../../test/test-data";
import { StatsData } from "../../types";

//TODO: save results in local storage and add functinality

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
    const timesWon = data.filter((currentData) => currentData.guessed);
    return Math.round((timesWon.length / timesPlayed) * 100);
  };

  const calcBarPer = (data: StatsData[]): number[] => {
    const temp = [0, 0, 0, 0, 0];
    const timesWon = data.filter((currentData) => currentData.guessed);
    timesWon.map((current) => {
      if (current.guessedAt) {
        temp[current.guessedAt - 1] = temp[current.guessedAt - 1] + 1;
      }
    });

    const barChartData = temp.map((current) =>
      Math.round((current / timesWon.length) * 100)
    );

    return barChartData;
  };

  useEffect(() => {
    setTimesPlayed(dummyData.length);
    setWinPercent(calcWinPer(dummyData));
    setBarChartData(calcBarPer(dummyData));
  }, [dummyData]);

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
