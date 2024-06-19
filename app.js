var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

//สำหรับส่งข้อมูลมาที่ views
const flash = require('connect-flash')
const expressSession = require('express-session')



var app = express();


// Router require
const loginRouter = require('./routes/01_login_router')
const homeRouter = require('./routes/02_home_page_router')
const inventoryRouter = require('./routes/03_inventory_page_router')
const financeRouter = require('./routes/04_finance_router')
const surveyRouter = require('./routes/05_survey_router')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// flash สำหรับการส่ง error มาที่หน้า views 
app.use(flash())
// expressSession สำหรับส่ง flash
app.use(expressSession({
  secret: 'DDM',
  saveUninitialized: true,
  resave: false
}))

// var for check user login
global.loggedIn = null

// collect user id in session
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})






// Router used
app.use('/', loginRouter)
app.use('/home', homeRouter)
app.use('/inventory', inventoryRouter)
app.use('/finance', financeRouter)
app.use('/survey', surveyRouter)

// app.use('/', indexRouter);
// app.use('/users', usersRouter);




















// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port} http://localhost:${port}`)
})
