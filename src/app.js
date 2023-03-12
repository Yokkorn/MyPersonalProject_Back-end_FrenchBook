require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const notFoundMiddleware = require("./middlewares/not-found");
const errordMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 10000,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errordMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.bgMagenta(`server is running on port: ${port}`))
);
