require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");

// creating Port
const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/products", require("./routes/productRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/category", require("./routes/categoryRoutes"));

app.all("*", (req, res) => {
  res.status(404).json({ error: "Path Not Found" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("uncaughtException", function (err) {
  console.log(err);
});
