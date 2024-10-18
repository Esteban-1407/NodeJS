const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database.js');
const itemRoutes = require('./src/routes/itemRoutes.js');
const errorHandler = require('./src/middleware/errorHandler.js');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/items', itemRoutes);

app.use(errorHandler);

module.exports = app;