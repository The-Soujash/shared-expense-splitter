import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

export function CreateGroupModal({ isOpen, onClose, onCreateGroup }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [memberNames, setMemberNames] = useState(['']);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const validMemberNames = memberNames.filter((name) => name.trim());
      onCreateGroup(name.trim(), description.trim() || undefined, validMemberNames);
      setName('');
      setDescription('');
      setMemberNames(['']);
      onClose();
    }
  };

  const addMemberField = () => {
    setMemberNames([...memberNames, '']);
  };

  const removeMemberField = (index) => {
    setMemberNames(memberNames.filter((_, i) => i !== index));
  };

  const updateMemberName = (index, value) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create New Group</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
              Group Name *
            </label>
            <input
              type="text"
              id="groupName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., Trip to Europe, House Expenses"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="Brief description of the group..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Members (optional)
            </label>
            <div className="space-y-2">
              {memberNames.map((memberName, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => updateMemberName(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Member name"
                  />
                  {memberNames.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMemberField(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMemberField}
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add another member</span>
              </button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
