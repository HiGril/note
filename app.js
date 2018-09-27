const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const dbConnect = require("./database/config")  //引入连接的数据库
const session = require("express-session")  //引入session
const MongoStroe = require("connect-mongo")(session)


const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.resolve(__dirname,"static"))) //托管static文件路径


//set   session

app.use(session({
  secret:"wyy",
  name:"sid",
  resave:false,//是否重新保存
  saveUninitialized:false,//保存初始化
  cookie:{exports:1000*60*60*24*30,secure:false} ,  //30 days
  store:new MongoStroe({mongooseConnection:dbConnect})


}))

app.use('/', indexRouter);


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
