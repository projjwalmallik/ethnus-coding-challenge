import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionTable = ({ month, setMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions/list",
          {
            params: { page, perPage, search, month },
          }
        );
        setTransactions(response.data.transactions);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, [page, perPage, search, month]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center  mb-4">
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-2xl mr-2 w-1/3 bg-yellow-200"
        />
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => setPage(1)}
        >
          Go
        </button>
        <div>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded-xl bg-yellow-400 ml-2 right-4"
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-yellow-200 rounded-lg border-collapse">
          <thead>
            <tr>
              <th className="p-3 border-b border-r border-black text-center text-sm font-semibold rounded-tl-lg">
                ID
              </th>
              <th className="p-3 border-b border-r border-black text-center text-sm font-semibold">
                Title
              </th>
              <th className="p-3 border-b border-r border-black text-center text-sm font-semibold">
                Description
              </th>
              <th className="p-3 border-b border-r border-black text-center text-sm font-semibold">
                Price
              </th>
              <th className="p-3 border-b border-r border-black text-center text-sm font-semibold">
                Category
              </th>
              <th className="p-3 border-b border-r border-black text-center text-sm font-semibold">
                Sold
              </th>
              <th className="p-3 border-b border-black text-center text-sm font-semibold rounded-tr-lg">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="bg-yellow-200">
                <td className="p-3 border-b border-r border-black text-center">
                  {transaction.id}
                </td>
                <td className="p-3 border-b border-r border-black text-center">
                  {transaction.title}
                </td>
                <td className="p-3 border-b border-r border-black text-center">
                  {transaction.description}
                </td>
                <td className="p-3 border-b border-r border-black text-center">
                  {transaction.price}
                </td>
                <td className="p-3 border-b border-r border-black text-center">
                  {transaction.category}
                </td>
                <td className="p-3 border-b border-r border-black text-center">
                  {transaction.sold ? "Yes" : "No"}
                </td>
                <td className="p-3 border-b border-black text-center">
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from({ length: Math.ceil(total / perPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
