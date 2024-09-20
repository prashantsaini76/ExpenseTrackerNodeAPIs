const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Expense Schema
const expenseSchema = new Schema({
    userId: {  type: String, required: true },
    date: { type: Date, required: true },
    transferMode: { type: String, required: true },
    bankName: { type: String, required: true },
    item: { type: String, required: true },
    amount: { type: Number, required: true }
  });
  
  module.exports= mongoose.model('Expense', expenseSchema); 