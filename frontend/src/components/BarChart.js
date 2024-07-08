import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions/bar-chart",
          {
            params: { month },
          }
        );
        setBarData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data", error);
      }
    };

    fetchBarChartData();
  }, [month]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("myBarChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: barData.map((item) => item.priceRange),
        datasets: [
          {
            label: "Number of Items",
            data: barData.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { type: "category" },
          y: { beginAtZero: true },
        },
      },
    });
  }, [barData]);
  const monthName = new Date(`2022-${month}-01`).toLocaleString("default", {
    month: "long",
  });
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Bar Chart - {monthName}</h2>
      <div className="relative h-80 max-w-lg">
        <canvas id="myBarChart" className="h-full w-full"></canvas>
      </div>
    </div>
  );
};

export default BarChart;
