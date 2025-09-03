import React from "react";
import { Users, Calculator, LogOut } from "lucide-react";

export function Header({ onCreateGroup, selectedGroupName, currentUser, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Group Name */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-emerald-600" />
              <h1 className="text-xl font-bold text-gray-900">SplitWise</h1>
            </div>
            {selectedGroupName && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-700 font-medium">{selectedGroupName}</span>
              </>
            )}
          </div>

          {/* User + Actions */}
          <div className="flex items-center space-x-4">
            {currentUser && (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium text-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">{currentUser.name}</span>
              </div>
            )}

            <button
              onClick={onCreateGroup}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">New Group</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
