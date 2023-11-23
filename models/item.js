const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 brand: {
  type: String,
  required: true
 },
 shop: {
  type: String,
  required: true
 },
 acronym: {
  type: String,
  required: true
 },
 country: {
  type: String,
  required: true
 },
 prices: [
  {
    price: {
      type: Number,
      required: true
     },
    currency: {
      type: String,
      required: true
    },
    updateDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  }
 ],
})

module.exports = mongoose.model('Item', itemSchema);