var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const routes = require("./route");

var cors = require('cors');

var app = express();
app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1", routes);

app.use('/', indexRouter);


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var port = process.env.PORT || '4000';
app.listen(port);
module.exports = app;


// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const routes = require("./routes");
// const cache = require("./middlewares/cache");
// const errorHandler = require("./middlewares/errorHandler");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors());
// app.use(cache());
// app.use("/api/v1", routes);
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log("Listening at", PORT);
// });
