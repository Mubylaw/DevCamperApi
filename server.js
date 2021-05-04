const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')

// route files
const bootcamp = require('./routes/bootcamps');

// load env vars
dotenv.config({path: './config/config.env' });

const app = express();
// dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use('/api/v1/bootcamps', bootcamp);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));