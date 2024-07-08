import React, { useEffect, useState } from "react";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import axios from "axios";

const App = () => {
  const [month, setMonth] = useState("03"); // Default to March
  useEffect(() => {
    const databaseCreated = axios.get(
      `http://localhost:5000/api/transactions/initialize`
    );
    if (databaseCreated) {
      console.log("Database created successfully!");
    } else {
      console.log("Database creation failed!");
    }
  });

  return (
    <div className="container mx-auto p-4 bg-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions Dashboard</h1>
      </div>
      <TransactionTable month={month} setMonth={setMonth} />
      <Statistics month={month} />
      <div className="flex">
        <BarChart month={month} />
        <PieChart month={month} />
      </div>
    </div>
  );
};

export default App;
