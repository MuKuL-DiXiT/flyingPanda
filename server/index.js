const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const alertsRouter = require('./routes/alerts');

const app = express();

// CORS configuration with environment variable
const corsOptions = {
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:3000'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

app.use('/alerts', alertsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/flyingPanda';

console.log('Starting server...');
console.log('PORT:', PORT);
console.log('MONGO_URI set:', !!process.env.MONGO_URI);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });
