import React, { useEffect, useState } from "react";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import axios from "axios";

const App = () => {
  const [month, setMonth] = useState("03");

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transactions/initialize`
        );
        if (response.data.success) {
          console.log("Database created successfully!");
        } else {
          console.log("Database creation failed!");
        }
      } catch (error) {
        console.log("Error initializing database", error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <div className="container w-full p-4 bg-slate-200">
      <div className="flex w-full justify-center items-center mb-4">
        <div className="w-40 h-40 flex items-center justify-center rounded-full text-2xl text-center font-bold bg-white">
          Transactions Dashboard
        </div>
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
