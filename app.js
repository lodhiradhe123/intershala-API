require('dotenv').config({ path: './.env' })
const express = require('express');
const app = express();

const indexRouter = require('./routes/indexRoutes');


//database stablist 
require('./models/database').connectDatabase();


//logger(morgan initialisation)
const logger = require('morgan');
app.use(logger("tiny"));

// body-parser
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

//session and cookie-manager
const session = require('express-session');
const cookieparser = require("cookie-parser");

app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: process.env.SESSION_SECRET_SECRET,
   
}))

app.use(cookieparser());

//routes 
app.use('/', indexRouter);

//error handlers
// if user hit on unexisting route then
const ErrorHandler = require('./utils/ErrorHandler');
const { generatedErrors } = require('./middlewares/errors');
app.all('*', (req, res, next) => {
   next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
})
app.use(generatedErrors)
app.listen(process.env.PORT, () => {
   console.log("server is running on port 8080");
});