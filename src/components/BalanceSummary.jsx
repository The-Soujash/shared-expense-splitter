import React, { useState } from "react";
import { TrendingUp, TrendingDown, CheckCircle2, XCircle } from "lucide-react";

export function BalanceSummary({ balances, debts }) {
  const [paidDebts, setPaidDebts] = useState([]);

  const handlePaid = (index) => {
    if (!paidDebts.includes(index)) {
      setPaidDebts([...paidDebts, index]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Balance Summary
        </h3>
        <div className="space-y-3">
          {balances.map((balance) => (
            <div
              key={balance.userId}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-700">
                {balance.userName}
              </span>
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
                    <XCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500 font-semibold">$0.00</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who owes whom */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Who Owes Whom
        </h3>
        <div className="space-y-4">
          {debts.length > 0 ? (
            debts.map((debt, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  paidDebts.includes(index)
                    ? "bg-green-50 border-green-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <p className="text-gray-900 font-medium">
                  {debt.fromUserName} owes {debt.toUserName} $
                  {debt.amount.toFixed(2)}
                </p>

                {paidDebts.includes(index) ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <CheckCircle2 className="h-5 w-5 mr-1" /> Paid
                  </span>
                ) : (
                  <button
                    onClick={() => handlePaid(index)}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
              All settled up!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
