require('dotenv').config();         //load .env variables to process.env global var 
require('express-async-errors');    //to wrap around all controllers and handle async errors 
const express = require('express'); //import express
const app = express();              //create express app
const authMiddleware = require('./middleware/authentication')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//connectDB
const connectDB = require('./db/connect')

//import routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// import custom middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//if behind proxy 
app.set('trust proxy', 1)

//use default middleware 
app.use(rateLimiter({windowsMs: 15 * 60 * 1000,max: 100}))
app.use(express.json()); //if not parsed, will appear undefined due to format
app.use(helmet())
app.use(cors())
app.use(xss())

// extra packages

// routes
app.use('/api/v1/auth', authRouter) 
app.use('/api/v1/jobs', authMiddleware,jobsRouter)//middleware will come before all the authRouter and this will protect all the job routes.

//use custom middleware after routers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('database connection secured')
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
