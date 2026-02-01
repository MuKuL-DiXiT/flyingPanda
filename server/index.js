const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const alertsRouter = require('./routes/alerts');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/alerts', alertsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/flyingPanda';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
