import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

export function GroupSelector({ groups, selectedGroupId, onSelectGroup }) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Groups Yet</h2>
        <p className="text-gray-500">Create your first group to start splitting expenses!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Select a Group</h2>
      <div className="grid gap-3">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              selectedGroupId === group.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 bg-white hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{group.name}</h3>
                {group.description && (
                  <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
