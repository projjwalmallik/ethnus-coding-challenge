const axios = require("axios");
const Transaction = require("../models/Transaction");

const initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error initializing database", error });
  }
};

const listTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;
  const regex = new RegExp(search, "i");
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    0
  );

  const searchNumber = parseFloat(search);
  const isNumberSearch = !isNaN(searchNumber);

  try {
    const searchConditions = [{ title: regex }, { description: regex }];

    if (isNumberSearch) {
      searchConditions.push({ price: searchNumber });
    }

    const transactions = await Transaction.find({
      $and: [
        { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } },
        { $or: searchConditions },
      ],
    })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Transaction.countDocuments({
      $and: [
        { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } },
        { $or: searchConditions },
      ],
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: "Error listing transactions", error });
  }
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    0
  );

  try {
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
          sold: true,
        },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const soldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
      sold: true,
    });

    const notSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    0
  );

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const barChartData = await Promise.all(
      priceRanges.map(async ({ range, min, max }) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
          price: { $gte: min, $lte: max },
        });
        return { priceRange: range, count };
      })
    );

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error });
  }
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    0
  );

  try {
    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error });
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await listTransactions(req, res, true);
    const statistics = await getStatistics(req, res, true);
    const barChart = await getBarChart(req, res, true);
    const pieChart = await getPieChart(req, res, true);

    res.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching combined data", error });
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
