const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 8080;

const app = express();

dotenv.config();

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", AuthRoutes);
app.use("/api", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
