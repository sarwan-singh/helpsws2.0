var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var getSampleData =  require('./public/javascripts/Services/ConnectDB')
var indexRouter = require('./routes/index');
var scanRouter = require('./routes/scan');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentication');
var garbageRouter = require('./routes/garbage');
var userDataRouter = require('./routes/userData');
var sentenceRouter = require('./routes/sentences');
var cors = require('cors')
var dotenv = require('dotenv')
var swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

var app = express();

dotenv.config();

const swaggerDocument = require('./swagger.json');

// const swaggerDocs = swaggerJSDoc(swaggerOptions);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', scanRouter);
app.use('/', authenticationRouter);
app.use('/', garbageRouter);
app.use('/', userDataRouter);
app.use('/users', usersRouter);
app.use('/', sentenceRouter);

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

module.exports = app;
