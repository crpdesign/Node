var createError = require('http-errors');
var express = require('express');
var json2xls = require('json2xls');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var json = require('./public/StrategyHighlights.json');
var app = express();
//var port = process.env.port || 3000;
//app.listen(port) ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/strategyhighlights", (req, res, next) => {  res.json([]); });
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

//var json = '/public/StrategyHighlights.json' ;
  // {
  //     "Document Title": "T. Rowe Price Funds SICAV - Euro Corporate Bond Fund Strategy Highlights 0319",
  //     "Document Type": "Strategy Highlights",
  //     "Fund Type": "Luxembourg Domiciled Mutual Funds (SICAV)",
  //     "ISIN": "LU0133089424,LU1573293161,LU1573293245,LU0133091248,LU1529919240,LU0859257338,LU1032541242,LU1830905185,LU0133091321",
  //     "Country": "Austria,Belgium,Denmark,Estonia,Finland,Germany,Hong Kong,Iceland,Ireland,Italy,Latvia,Lithuania,Luxembourg,Norway,Singapore,Spain,Sweden,Switzerland,United Kingdom",
  //     "Language": "English",
  //     "URL": "https://www4.troweprice.com/icw/consultant/public/fundDocumentLink/StrategyHighlights/PRCD-ECBIE/DOMC-Austria/LANG-English/GISLinks",
  //     "ISIN Count": 9,
  //     "Period End Date": "03/31/2019",
  //     "Active Date": "04/29/2019",
  //     "Inactive Date": "07/23/2019",
  //     "Expiration Date": "4/23/26 12:00 AM",
  //     "Last Updated Date": "2019-04-29T08:22:18.032202",
  //     "Query Date Time": "5/29/19 5:26 PM",
  //     "FundCode": "ECBIE,ECBIR,ECBHU,ECBQE,ECBQR,ECBZE,ECBAE,ECBAK,ECBAS",
  //     "FundCode Count": 9,
  //     "FundCodes Ignored": 0,
  //     "Audience": "Sophisticated Audience (non-NASD defined institutions)"
  // };

console.log(json);
var xls = json2xls(json) ;
fs.writeFileSync('data.xlsx', xls, 'binary');