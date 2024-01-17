const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { loggerMiddleware } = require("./middlewares/logger.middleware");
const sessionConfig = require("./configs/session.config");
const corsConfig = require("./configs/cors.config");
const { DOC_TEMPLATE } = require("./utils/constants");

const app = express();
const port = 3000;

// Middleware
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(cookieParser());
app.use(useragent.express());
app.use(loggerMiddleware);

app.enable("trust proxy");

// Default route
app.get("/", (req, res) => {
  res.send(DOC_TEMPLATE);
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message, err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
  return;
});

// Register routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
