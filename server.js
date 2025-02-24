const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Cookie parser
app.use(cookieParser());

//Route files
const hotels = require("./routes/hotels");
const bookings = require("./routes/bookings");
const auth = require("./routes/auth");

//Body parser
app.use(express.json());

//Mount routers
app.use("/api/v1/hotels", hotels);
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
