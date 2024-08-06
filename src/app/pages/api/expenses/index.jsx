// pages/api/expenses/index.js

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
    case 'GET':
      try {
        const expenses = await Expense.find({
          participants: session.user.id,
        }).populate('payer participants');
        res.status(200).json(expenses);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
