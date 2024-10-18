const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: String },
});

module.exports = mongoose.model('Item', itemSchema);
