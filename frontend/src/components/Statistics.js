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
      const { data } = await fetchStatistics(month);
      setStatistics(data);
    };
    loadStatistics();
  }, [month]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Sale Amount</h3>
          <p className="text-2xl">{statistics.totalSaleAmount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Sold Items</h3>
          <p className="text-2xl">{statistics.soldItems}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Not Sold Items</h3>
          <p className="text-2xl">{statistics.notSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
