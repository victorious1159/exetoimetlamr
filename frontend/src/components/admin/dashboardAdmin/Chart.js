import React from "react";
import "./TransactionChart.css";

const TransactionChart = () => {
  // Đổi tên transaction và đơn vị tiền tệ
  const labels = ["Tuấn Tú", "Trần ĐứC Phương", "Huy Ngoc", "Hòa"];
  const data = [310000, 125000, 125000, 100000]; // Giá trị theo VND
  const maxDataValue = Math.max(...data);

  return (
    <div className="chart-container">
      <h2>Biểu đồ giao dịch</h2>
      <svg width="600" height="400" className="line-chart">
        {/* Vẽ trục X và Y */}
        <line x1="50" y1="350" x2="550" y2="350" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="350" stroke="#333" strokeWidth="2" />

        {/* Vẽ đường biểu đồ */}
        <polyline
          fill="none"
          stroke="#4bc0c0"
          strokeWidth="2"
          points={data
            .map((value, index) => {
              const x = 50 + ((500 / (data.length - 1)) * index);
              const y = 350 - (300 * (value / maxDataValue));
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* Vẽ các điểm và tooltip */}
        {data.map((value, index) => {
          const x = 50 + ((500 / (data.length - 1)) * index);
          const y = 350 - (300 * (value / maxDataValue));

          return (
            <g key={index}>
              <circle cx={x} cy={y} r="5" fill="#4bc0c0" />
              <text x={x - 25} y={y - 10} className="chart-label">{value.toLocaleString()} VND</text>
              <text x={x} y="370" textAnchor="middle" className="chart-label">{labels[index]}</text>
              <title>{value.toLocaleString()} VND</title> {/* Tooltip cho mỗi điểm */}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TransactionChart;
