const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body-parser
app.use(express.json());

// routes
moviesApi(app);

// catch 404
app.use(notFoundHandler);

// errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`App linstening on http://localhost:${config.port}`);
});
