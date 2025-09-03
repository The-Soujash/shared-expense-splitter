import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  groups: [],
  expenses: [],
  settlements: [],
  selectedGroupId: null,
};

export function useExpenses() {
  const [state, setState] = useLocalStorage('expense-splitter-state', initialState);

  const setCurrentUser = useCallback(
    (user) => {
      setState((prev) => ({
        ...prev,
        currentUser: user,
        isAuthenticated: !!user,
      }));
    },
    [setState]
  );

  const createGroup = useCallback(
    (name, description, memberNames = []) => {
      if (!state.currentUser) return null;

      const newGroup = {
        id: crypto.randomUUID(),
        name,
        description,
        members: [
          state.currentUser,
          ...memberNames.map((memberName) => ({
            id: crypto.randomUUID(),
            name: memberName,
            email: `${memberName.toLowerCase().replace(' ', '.')}@example.com`,
          })),
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setState((prev) => ({
        ...prev,
        groups: [...prev.groups, newGroup],
        selectedGroupId: newGroup.id,
      }));

      return newGroup;
    },
    [state.currentUser, setState]
  );

  const addExpense = useCallback(
    (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };

      setState((prev) => ({
        ...prev,
        expenses: [...prev.expenses, newExpense],
      }));

      return newExpense;
    },
    [setState]
  );

  const addSettlement = useCallback(
    (settlement) => {
      const newSettlement = {
        ...settlement,
        id: crypto.randomUUID(),
      };

      setState((prev) => ({
        ...prev,
        settlements: [...prev.settlements, newSettlement],
      }));

      return newSettlement;
    },
    [setState]
  );

  const selectGroup = useCallback(
    (groupId) => {
      setState((prev) => ({
        ...prev,
        selectedGroupId: groupId,
      }));
    },
    [setState]
  );

  const selectedGroup = useMemo(() => {
    if (!state.selectedGroupId) return null;
    return state.groups.find((g) => g.id === state.selectedGroupId) || null;
  }, [state.groups, state.selectedGroupId]);

  const groupExpenses = useMemo(() => {
    if (!state.selectedGroupId) return [];
    return state.expenses.filter((e) => e.groupId === state.selectedGroupId);
  }, [state.expenses, state.selectedGroupId]);

  const groupSettlements = useMemo(() => {
    if (!state.selectedGroupId) return [];
    return state.settlements.filter((s) => s.groupId === state.selectedGroupId);
  }, [state.settlements, state.selectedGroupId]);

  const calculateBalances = useCallback(
    (groupId) => {
      const group = state.groups.find((g) => g.id === groupId);
      if (!group) return [];

      const expenses = state.expenses.filter((e) => e.groupId === groupId);
      const settlements = state.settlements.filter((s) => s.groupId === groupId);

      // Initialize balances for all group members
      const balances = {};
      group.members.forEach((member) => {
        balances[member.id] = 0;
      });

      // Process expenses
      expenses.forEach((expense) => {
        balances[expense.paidBy] += expense.amount;

        expense.shares.forEach((share) => {
          balances[share.userId] -= share.amount;
        });
      });

      // Process settlements
      settlements.forEach((settlement) => {
        balances[settlement.fromUserId] -= settlement.amount;
        balances[settlement.toUserId] += settlement.amount;
      });

      return group.members.map((member) => ({
        userId: member.id,
        userName: member.name,
        balance: balances[member.id],
      }));
    },
    [state.groups, state.expenses, state.settlements]
  );

  const calculateDebts = useCallback(
    (groupId) => {
      const balances = calculateBalances(groupId);
      const debts = [];

      const creditors = balances.filter((b) => b.balance > 0.01);
      const debtors = balances.filter((b) => b.balance < -0.01);

      creditors.forEach((creditor) => {
        debtors.forEach((debtor) => {
          if (creditor.balance > 0.01 && debtor.balance < -0.01) {
            const amount = Math.min(creditor.balance, Math.abs(debtor.balance));

            debts.push({
              fromUserId: debtor.userId,
              fromUserName: debtor.userName,
              toUserId: creditor.userId,
              toUserName: creditor.userName,
              amount,
            });

            creditor.balance -= amount;
            debtor.balance += amount;
          }
        });
      });

      return debts.filter((debt) => debt.amount > 0.01);
    },
    [calculateBalances]
  );

  return {
    state,
    setCurrentUser,
    selectedGroup,
    groupExpenses,
    groupSettlements,
    createGroup,
    addExpense,
    addSettlement,
    selectGroup,
    calculateBalances,
    calculateDebts,
  };
}
