import React, { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';

const categories = [
  { value: 'food', label: 'Food & Drinks', color: 'bg-red-100 text-red-800' },
  { value: 'transport', label: 'Transportation', color: 'bg-blue-100 text-blue-800' },
  { value: 'accommodation', label: 'Accommodation', color: 'bg-green-100 text-green-800' },
  { value: 'entertainment', label: 'Entertainment', color: 'bg-purple-100 text-purple-800' },
  { value: 'shopping', label: 'Shopping', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'utilities', label: 'Utilities', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
];

export function ExpenseForm({ group, onAddExpense }) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(group.members[0]?.id || '');
  const [category, setCategory] = useState('other');
  const [splitType, setSplitType] = useState('equal');
  const [customShares, setCustomShares] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalAmount = parseFloat(amount);
    if (isNaN(totalAmount) || totalAmount <= 0) return;

    let shares;

    if (splitType === 'equal') {
      const shareAmount = totalAmount / group.members.length;
      shares = group.members.map((member) => ({
        userId: member.id,
        amount: shareAmount
      }));
    } else {
      shares = group.members.map((member) => ({
        userId: member.id,
        amount: parseFloat(customShares[member.id] || '0')
      }));
    }

    onAddExpense({
      groupId: group.id,
      description: description.trim(),
      amount: totalAmount,
      paidBy,
      shares,
      category,
      date: new Date()
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('other');
    setSplitType('equal');
    setCustomShares({});
    setIsOpen(false);
  };

  const updateCustomShare = (userId, value) => {
    setCustomShares((prev) => ({
      ...prev,
      [userId]: value
    }));
  };

  const totalCustomShares = Object.values(customShares).reduce((sum, value) => {
    return sum + (parseFloat(value) || 0);
  }, 0);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
      >
        <Plus className="h-5 w-5" />
        <span>Add Expense</span>
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="What was this expense for?"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700 mb-2">
              Paid by *
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              {group.members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Split Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSplitType('equal')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                splitType === 'equal'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              Split Equally
            </button>
            <button
              type="button"
              onClick={() => setSplitType('custom')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                splitType === 'custom'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              Custom Split
            </button>
          </div>
        </div>

        {splitType === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Amounts
            </label>
            <div className="space-y-2">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <span className="w-24 text-sm text-gray-700 truncate">{member.name}</span>
                  <div className="flex-1 relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={customShares[member.id] || ''}
                      onChange={(e) => updateCustomShare(member.id, e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              ))}
              {splitType === 'custom' && amount && (
                <div className="text-sm text-gray-600">
                  Total: ${totalCustomShares.toFixed(2)} / ${parseFloat(amount || '0').toFixed(2)}
                  {Math.abs(totalCustomShares - parseFloat(amount || '0')) > 0.01 && (
                    <span className="text-red-600 ml-2">⚠️ Amounts don't match</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={splitType === 'custom' && Math.abs(totalCustomShares - parseFloat(amount || '0')) > 0.01}
            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}
