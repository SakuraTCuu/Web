var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout')

var multer = require('multer');
var mongoose = require('mongoose')

var app = express();


/**  添加session  */
app.use(session({
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

/** view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/** 添加路由 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/home', indexRouter); // 即为为路径 /home 设置路由
app.use("/logout", logoutRouter); // 即为为路径 /logout 设置路由


/** 设置连接数据库 */
global.dbHandle = require('./database/dbHandel')
global.db = mongoose.connect("mongodb://localhost:27017/nodedb", { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('Connection Error:' + err)
  } else {
    console.log('Connection success!')
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.locals.user = req.session.user; // 从session 获取 user对象
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  console.log('err====>>>', err)
  if (err) {
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
  }
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("err-->>", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
