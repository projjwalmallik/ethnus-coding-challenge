import React, { useState, useEffect } from "react";
import { fetchStatistics } from "../services/api";

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const { data } = await fetchStatistics(month);
        setStatistics(data);
      } catch (error) {
        console.error("Error loading statistics", error);
      }
    };
    loadStatistics();
  }, [month]);

  const monthName = new Date(`2022-${month}-01`).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="bg-yellow-200 p-6 rounded-xl max-w-xl ml-8 my-8">
      <h2 className="text-2xl font-bold mb-4">Statistics - {monthName}</h2>
      <div className="flex flex-col items-start">
        <div className="flex justify-between w-full mb-2">
          <h3 className="text-lg font-semibold mr-2">Total Sale Amount:</h3>
          <p className="text-xl">{statistics.totalSaleAmount}</p>
        </div>
        <div className="flex justify-between w-full mb-2">
          <h3 className="text-lg font-semibold">Sold Items:</h3>
          <p className="text-xl">{statistics.soldItems}</p>
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-lg font-semibold">Not Sold Items:</h3>
          <p className="text-xl">{statistics.notSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
