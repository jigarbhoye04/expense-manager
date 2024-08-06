// models/Expense.js

import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  paidStatus: { type: Map, of: Boolean },
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
