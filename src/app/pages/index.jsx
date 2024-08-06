// pages/index.js

import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import axios from 'axios';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const session = await getSession();
      if (!session) {
        window.location.href = '/auth/signin';
      } else {
        const { data } = await axios.get('/api/expenses');
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button
        onClick={handleSignOut}
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <ul className="mt-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="p-4 mb-4 bg-gray-100 rounded shadow"
            >
              <p className="font-bold">{expense.title}</p>
              <p>Amount: ${expense.amount}</p>
              <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
              <p>Payer: {expense.payer.name}</p>
              <p>Participants: {expense.participants.map((p) => p.name).join(', ')}</p>
              <p>Paid Status: {JSON.stringify(expense.paidStatus)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
