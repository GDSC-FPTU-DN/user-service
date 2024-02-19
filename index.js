// Modules imports
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

// Route imports
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// Middleware imports
const { loggerMiddleware } = require("./middlewares/logger.middleware");
const sessionConfig = require("./configs/session.config");
const corsConfig = require("./configs/cors.config");
const swaggerConfig = require("./configs/swagger.config");
const redisClient = require("./configs/redis.config");
const { APP_NAME } = require("./utils/constants");

// App setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(cookieParser());
app.use(useragent.express());
app.use(loggerMiddleware);

// Trust proxy
app.enable("trust proxy");

// Default route. Show the api documentation
app.get("/", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)));

// Error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.message, err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
  return;
});

// Register children routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Start the server
async function startServer() {
  // Connect to redis client
  await redisClient.connect();
  app.listen(port, () => {
    console.log(`${APP_NAME} is listening on port: ${port}`);
  });
}

startServer();
