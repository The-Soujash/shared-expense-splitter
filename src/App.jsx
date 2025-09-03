import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useExpenses } from "./hooks/useExpenses";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Header } from "./components/Header";
import { GroupSelector } from "./components/GroupSelector";
import { CreateGroupModal } from "./components/CreateGroupModal";
import { GroupDashboard } from "./components/GroupDashboard";

function App() {
  const {
    isAuthenticated,
    currentUser,
    error,
    isLoading,
    login,
    register,
    logout,
    clearError,
  } = useAuth();

  const {
    state,
    setCurrentUser,
    selectedGroup,
    groupExpenses,
    createGroup,
    addExpense,
    addSettlement,
    selectGroup,
    calculateBalances,
    calculateDebts,
  } = useExpenses();

  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // keep user in sync
  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser, setCurrentUser]);

  const handleCreateGroup = (name, description, memberNames) => {
    createGroup(name, description, memberNames);
    setIsCreateGroupModalOpen(false);
  };

  const handleAddExpense = (expense) => {
    addExpense(expense);
  };

  const handleSettle = (fromUserId, toUserId, amount) => {
    if (selectedGroup) {
      addSettlement({
        groupId: selectedGroup.id,
        fromUserId,
        toUserId,
        amount,
        date: new Date().toISOString(),
        note: "Settled via app",
      });
    }
  };

  const handleLogout = () => {
    logout();
    selectGroup(null);
  };

  // 🔐 show auth if not logged in
  if (!isAuthenticated) {
    return authMode === "login" ? (
      <LoginForm
        onLogin={login}
        onSwitchToRegister={() => setAuthMode("register")}
        error={error}
        isLoading={isLoading}
        onClearError={clearError}
      />
    ) : (
      <RegisterForm
        onRegister={register}
        onSwitchToLogin={() => setAuthMode("login")}
        error={error}
        isLoading={isLoading}
        onClearError={clearError}
      />
    );
  }

  const balances = selectedGroup ? calculateBalances(selectedGroup.id) : [];
  const debts = selectedGroup ? calculateDebts(selectedGroup.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        selectedGroupName={selectedGroup?.name}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedGroup ? (
          <GroupSelector
            groups={state.groups}
            selectedGroupId={state.selectedGroupId}
            onSelectGroup={selectGroup}
          />
        ) : (
          <GroupDashboard
            group={selectedGroup}
            expenses={groupExpenses}
            balances={balances}
            debts={debts}
            onAddExpense={handleAddExpense}
            onSettle={handleSettle}
            onBack={() => selectGroup(null)}
          />
        )}
      </main>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}

export default App;
