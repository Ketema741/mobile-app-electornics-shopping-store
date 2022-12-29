const express = require("express");

const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

// connect Database
connectDB();

// Init Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});
const PORT = process.env.PORT || 6000;

// Define Routes
app.use("/api/auth-user", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});