// pages/api/expenses/[id].js

import dbConnect from '../../../lib/dbConnect';
import Expense from '../../../models/Expense';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  switch (method) {
    case 'PUT':
      try {
        const expense = await Expense.findByIdAndUpdate(
          req.query.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!expense) {
          return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedExpense = await Expense.deleteOne({ _id: req.query.id });
        if (!deletedExpense) {
          return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
