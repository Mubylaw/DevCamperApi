const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// load env vars
dotenv.config({path: './config/config.env' });

// connect to database
connectDB();

// route files
const bootcamp = require('./routes/bootcamps');


const app = express();
// body parser
app.use(express.json());

// dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use('/api/v1/bootcamps', bootcamp);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled rejections
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`.red);
    // close server & exit process
    server.close(() => process.exit(1))
})
