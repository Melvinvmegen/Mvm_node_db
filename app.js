if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      glob = require("glob"),
      chalk = require("chalk"),
      bodyParser = require('body-parser'),
      db = require("./models/index"),
      cron = require('node-cron'),
      isAuth = require('./middleware/is-auth'),
      authRoutes = require('./routes/auth'),
      compression = require('compression')

// patch express async error handling
require("express-async-errors")

const Revenu = db.Revenu;

// Init web server
const app = express();

// compress all responses
app.use(compression())

// Logger
app.use(morgan(process.env.LOG_FORMAT || 'dev'));

// Express API Parse JSON
app.use(bodyParser.json())

// Handle options requests
app.use(cors());

// Auth routes
app.use('/users/', authRoutes)

// Protect all routes
app.all('*', isAuth);

// Apply all routes from API folder
glob
  .sync("./routes/**/[^._]*.js")
  .map((file) => {
    app.use('/', require(file))
  });

// Error handler
app.use((err, req, res, next) => {
  switch (err.name) {
    case "AppError":
      console.debug(
        chalk.yellow("AppError"),
        chalk.yellow(err.message),
        "at .../" +
          err.stack
            .split("\n")[1]
            .split(/[\\/]/)
            .slice(-3)
            .join("/")
            .slice(0, -1)
      );
      res.status(err.status || 400);
      res.json({
        error: {
          name: err.name,
          message: err.message,
          field: err.params && err.params.field,
          params: err.params,
        },
      });
      break;
    case "UnauthorizedError":
      console.debug(
        chalk.yellow("UnauthorizedError"),
        chalk.yellow(err.message)
      );
      res.status(err.status || 401);
      res.json({
        error: err,
      });
      break;
    case "SequelizeValidationError":
      if (err.errors) {
        err.errors.forEach((e) =>
          console.debug(
            chalk.yellow("ValidationError"),
            chalk.yellow(e.message)
          )
        );
      }
      res.status(err.status || 400);
      res.json({
        error: err.errors
          ? err.errors.map((e) => ({
              name: err.name,
              message: e.message,
              code: e.validatorKey,
              field: e.path,
              params: e.validatorArgs,
            }))
          : err,
      });
      break;
    default:
      console.error(
        chalk.bold.red("Technical error " + err.name),
        chalk.red(err.message),
        err
      );
      res.status(err.status || 500);
      res.json({
        error: err,
      });
  }
  next();
});

cron.schedule('0 0 1 * *', function() {
  Revenu.create(({createdAt: new Date(), total: 0, pro: 0, perso: 0}))
});

// Start server
db.sequelize.authenticate()
.then(() => {
  const port = process.env.PORT || 8080
  app.listen(port, () => {
    console.log(
      chalk.green(
        `Server started at http://localhost:${port}`
      )
    )
  })
})
.catch(err => {
  console.error(
    chalk.bold.red("DB error " + err.name),
    chalk.red(err.message),
    err
  );
})

// CleanUp after crash
process.on("SIGINT", () => {
  console.log("Stopping...");
  process.exit();
});