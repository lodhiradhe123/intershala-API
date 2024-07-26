require('dotenv').config({path:'./.env'})
const express = require('express');
const app = express();

const indexRouter=require('./routes/indexRoutes');
    

//logger(morgan initialisation)
const logger = require('morgan')
app.use(logger("tiny"));
//routes 
app.use('/', indexRouter);
app.listen(process.env.PORT,()=>{
    console.log("server is running on port 8080");
});