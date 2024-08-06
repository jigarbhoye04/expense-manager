// src/app/page.tsx

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">Welcome to the Expense Management App</h2>
      <p className="mb-4">Manage your expenses with ease and simplicity.</p>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Recent Expenses</h3>
        <p>No expenses added yet. Start by adding a new expense.</p>
      </div>
    </div>
  );
}
