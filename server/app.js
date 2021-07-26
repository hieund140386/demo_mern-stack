const express = require('express');
const { json } = express;
const cors = require('cors');

// routes
const postRouter = require('./routes/post');
const authenRouter = require('./routes/authen');

// env variable
const { PORT } = require('./configs/config');

// connect to DB
const connectDB = require('./configs/databaseConfig');

// init server
const app = express();

// enable cors
const corsOptions = {
  "methods": ['GET', 'POST', 'DELETE', 'PUT'],
  "allowedHeaders": ['Content-Type', 'Authorization'],
  "maxAge": 10000
}
app.use(cors());
// get data with json format
app.use(json());

// init connecting to DB
connectDB();

// authen route
app.use('/api/auth', authenRouter);

// post route
app.use('/api/posts', postRouter);

// listen server port
app.listen(PORT, () => {
  console.log(`Server is running on PORT of ${PORT}`);
});