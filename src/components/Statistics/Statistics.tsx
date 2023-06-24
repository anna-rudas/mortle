import React, { useEffect } from "react";
import CloseIcon from "../../icons/CloseIcon";

interface HowToPlayProps {
  closeStatistics: () => void;
}

function Statistics({ closeStatistics }: HowToPlayProps) {
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeStatistics();
      }
    };
    window.removeEventListener("keydown", closeModal);
    window.addEventListener("keydown", closeModal);
  });

  return (
    <div className="modal-con">
      <div className="modal-content-statistics">
        <button className="btn-close" onClick={closeStatistics}>
          <CloseIcon />
        </button>
        <h2 className="modal-title">Statistics</h2>
        <div className="statistics-sum-con">
          <div className="statistics-sum">
            <div className="statistics-text">played</div>
            <div className="statistics-number">1</div>
          </div>
          <div className="statistics-sum">
            <div className="statistics-text">Win %</div>
            <div className="statistics-number">100</div>
          </div>
        </div>
        <p className="statistics-text subtitle">Guess distribution</p>
        <div className="statistics-chart">
          <div className="chart">
            <div className="statistics-bar h0">
              <div className="statistics-percentage">0%</div>
            </div>
            <div className="statistics-chart-number">1</div>
          </div>
          <div className="chart">
            <div className="statistics-bar h0">
              <div className="statistics-percentage">0%</div>
            </div>
            <div className="statistics-chart-number">2</div>
          </div>
          <div className="chart">
            <div className="statistics-bar h0">
              <div className="statistics-percentage">0%</div>
            </div>
            <div className="statistics-chart-number">3</div>
          </div>
          <div className="chart">
            <div className="statistics-bar h0">
              <div className="statistics-percentage">0%</div>
            </div>
            <div className="statistics-chart-number">4</div>
          </div>
          <div className="chart">
            <div className="statistics-bar h100">
              <div className="statistics-percentage">100%</div>
            </div>
            <div className="statistics-chart-number">5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
