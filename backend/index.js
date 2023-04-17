require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000 || 5000;

const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin:  process.env.origin,
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  maxAge: 5000,
};

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(logger('dev'));

//routes
const accountRouter = require('./routes/account');
const galleryRouter = require('./routes/gallery');
const proxyRouter = require('./routes/proxy');
app.use('/account', accountRouter);
app.use('/gallery', galleryRouter);
app.use('/proxy', proxyRouter);

// error handling
const {routeError, errorHandler} = require('./middleware/error');
app.use(errorHandler);
app.use(routeError);
// unhandled errors handled by express-async-errors

// server
const connectDB = require('./connectDB');
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('DB connected');

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
