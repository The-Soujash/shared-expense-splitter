import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, HandHeart } from 'lucide-react';

export function BalanceSummary({ balances, debts, onSettle }) {
  const [settleAmount, setSettleAmount] = useState({});

  const handleSettle = (debt) => {
    const key = `${debt.fromUserId}-${debt.toUserId}`;
    const amount = parseFloat(settleAmount[key] || debt.amount.toString());

    if (amount > 0 && amount <= debt.amount) {
      onSettle(debt.fromUserId, debt.toUserId, amount);
      setSettleAmount((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const updateSettleAmount = (debt, value) => {
    const key = `${debt.fromUserId}-${debt.toUserId}`;
    setSettleAmount((prev) => ({ ...prev, [key]: value }));
  };

  const getSettleAmount = (debt) => {
    const key = `${debt.fromUserId}-${debt.toUserId}`;
    return settleAmount[key] || debt.amount.toString();
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Summary</h3>
        <div className="space-y-3">
          {balances.map((balance) => (
            <div
              key={balance.userId}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-700">{balance.userName}</span>
              <div className="flex items-center space-x-2">
                {balance.balance > 0.01 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-semibold">
                      +${balance.balance.toFixed(2)}
                    </span>
                  </>
                ) : balance.balance < -0.01 ? (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-red-600 font-semibold">
                      ${balance.balance.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500 font-semibold">$0.00</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Debts & Settlements */}
      {debts.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Settle Up</h3>
          <div className="space-y-4">
            {debts.map((debt, index) => (
              <div
                key={index}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-900">
                      <span className="font-medium">{debt.fromUserName}</span> owes{' '}
                      <span className="font-medium">{debt.toUserName}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Total amount ${debt.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={getSettleAmount(debt)}
                      onChange={(e) => updateSettleAmount(debt, e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Settlement amount"
                      step="0.01"
                      max={debt.amount}
                      min="0"
                    />
                  </div>
                  <button
                    onClick={() => handleSettle(debt)}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                    disabled={
                      !getSettleAmount(debt) ||
                      parseFloat(getSettleAmount(debt)) <= 0 ||
                      parseFloat(getSettleAmount(debt)) > debt.amount
                    }
                  >
                    <HandHeart className="h-4 w-4" />
                    <span>Settle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {debts.length === 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <HandHeart className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">All Settled Up!</h3>
          <p className="text-gray-600">No outstanding debts in this group.</p>
        </div>
      )}
    </div>
  );
}
