const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const transactionRoutes = require("./routes/transactions");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const dbName = "expenses";
mongoose.connect(`mongodb://0.0.0.0:27017/${dbName}`);

const database = mongoose.connection;
database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("DATABASE CONNECTED");
});

app.use("/api/transactions", transactionRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
