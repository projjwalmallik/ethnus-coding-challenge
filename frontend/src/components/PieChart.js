import React, { useState, useEffect } from "react";
import { fetchPieChart } from "../services/api";
import { Pie } from "react-chartjs-2";

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const loadPieData = async () => {
      try {
        const { data } = await fetchPieChart(month);
        setPieData(data);
      } catch (error) {
        console.error("Error loading pie chart data", error);
      }
    };
    loadPieData();
  }, [month]);

  const data = {
    labels: pieData.map((item) => item._id),
    datasets: [
      {
        data: pieData.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const chartStyle = {
    maxWidth: "400px", // Adjust as needed
    margin: "0 auto", // Center align horizontally
  };
  const monthName = new Date(`2022-${month}-01`).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="container mx-auto p-4">
      <div className="card">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Pie Chart - {monthName}</h2>
          <div style={chartStyle}>
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
