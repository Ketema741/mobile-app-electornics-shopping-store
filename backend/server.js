require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const path = require('path')
const cors = require("cors");

const app = express();
app.use(cors());

// connect Database
connectDB();
 
// Init Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname + 'public')));
 
app.use(
  cors({
    origin: "http://10.4.112.184:4420",
  }) 
)
 
const PORT = process.env.PORT || 4420;

// Define Routes
app.use("/api/auth-user", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/payment", require("./routes/checkoutPayment"));

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});