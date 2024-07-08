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
        scales: {
          x: { type: "category" },
          y: { beginAtZero: true },
        },
      },
    });
  }, [barData]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
      <canvas id="myBarChart"></canvas>
    </div>
  );
};

export default BarChart;
