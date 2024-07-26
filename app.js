require('dotenv').config({ path: './.env' })
const express = require('express');
const app = express();

const indexRouter = require('./routes/indexRoutes');


//logger(morgan initialisation)
const logger = require('morgan');
app.use(logger("tiny"));
//routes 
app.use('/', indexRouter);

//error handlers
// if user hit on unexisting route then
const ErrorHandler = require('./utils/ErrorHandler');
const { generatedErrors } = require('./middlewares/errors');
app.all('*', (req, res, next) => {
   next(new ErrorHandler(`Requested URL Not Found: ${req.url}`,404));
})
app.use(generatedErrors)
 app.listen(process.env.PORT, () => {
    console.log("server is running on port 8080");
});