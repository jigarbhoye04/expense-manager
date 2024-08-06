// pages/add-expense.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [participants, setParticipants] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/expenses', {
        title,
        amount,
        participants,
      });
      router.push('/');
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Add Expense</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
            />
          </div>
          <div>
            <label htmlFor="amount" className="sr-only">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amount"
            />
          </div>
          <div>
            <label htmlFor="participants" className="sr-only">
              Participants (comma-separated emails)
            </label>
            <input
              type="text"
              name="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value.split(','))}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Participants (comma-separated emails)"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
