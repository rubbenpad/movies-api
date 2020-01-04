const express = require('express');
const debug = require('debug')('app:server');
const app = express();

const { config } = require('./config/index');
const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body-parser
app.use(express.json());

// routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// catch 404
app.use(notFoundHandler);

// errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  debug(`App linstening on http://localhost:${config.port}`);
});
