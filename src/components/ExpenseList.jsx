import React from 'react';
import { Calendar, DollarSign, User } from 'lucide-react';

const categoryColors = {
  food: 'bg-red-100 text-red-800',
  transport: 'bg-blue-100 text-blue-800',
  accommodation: 'bg-green-100 text-green-800',
  entertainment: 'bg-purple-100 text-purple-800',
  shopping: 'bg-yellow-100 text-yellow-800',
  utilities: 'bg-indigo-100 text-indigo-800',
  other: 'bg-gray-100 text-gray-800'
};

const categoryLabels = {
  food: 'Food & Drinks',
  transport: 'Transportation',
  accommodation: 'Accommodation',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  utilities: 'Utilities',
  other: 'Other'
};

export function ExpenseList({ expenses, group }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Expenses Yet</h3>
        <p className="text-gray-500">Add your first expense to get started!</p>
      </div>
    );
  }

  const getUserName = (userId) => {
    return group.members.find(m => m.id === userId)?.name || 'Unknown';
  };

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
      <div className="space-y-3">
        {sortedExpenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">{expense.description}</h4>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[expense.category]}`}
                  >
                    {categoryLabels[expense.category]}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Paid by {getUserName(expense.paidBy)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-2">
                    {expense.shares.map((share) => (
                      <span key={share.userId} className="bg-gray-50 px-2 py-1 rounded">
                        {getUserName(share.userId)}: ${share.amount.toFixed(2)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ml-4 text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${expense.amount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
