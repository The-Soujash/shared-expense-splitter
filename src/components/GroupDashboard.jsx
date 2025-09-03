import React, { useState } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { BalanceSummary } from './BalanceSummary';
import { ArrowLeft, Users, Receipt, Calculator } from 'lucide-react';

export function GroupDashboard({
  group,
  expenses,
  balances,
  debts,
  onAddExpense,
  onSettle,
  onBack
}) {
  const [activeTab, setActiveTab] = useState('expenses');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
          {group.description && (
            <p className="text-gray-600">{group.description}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Members</p>
              <p className="text-xl font-semibold text-gray-900">{group.members.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Receipt className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Outstanding Debts</p>
              <p className="text-xl font-semibold text-gray-900">{debts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'expenses'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('balances')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'balances'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Balances
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'expenses' && (
          <>
            <ExpenseForm group={group} onAddExpense={onAddExpense} />
            <ExpenseList expenses={expenses} group={group} />
          </>
        )}

        {activeTab === 'balances' && (
          <BalanceSummary 
            balances={balances} 
            debts={debts} 
            onSettle={onSettle} 
          />
        )}
      </div>
    </div>
  );
}
