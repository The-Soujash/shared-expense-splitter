/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Group
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {User[]} members
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} ExpenseShare
 * @property {string} userId
 * @property {number} amount
 */

/**
 * @typedef {Object} Expense
 * @property {string} id
 * @property {string} groupId
 * @property {string} description
 * @property {number} amount
 * @property {string} paidBy
 * @property {ExpenseShare[]} shares
 * @property {ExpenseCategory} category
 * @property {Date} date
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Settlement
 * @property {string} id
 * @property {string} groupId
 * @property {string} fromUserId
 * @property {string} toUserId
 * @property {number} amount
 * @property {Date} date
 * @property {string} [note]
 */

/**
 * @typedef {Object} Balance
 * @property {string} userId
 * @property {string} userName
 * @property {number} balance
 */

/**
 * @typedef {Object} Debt
 * @property {string} fromUserId
 * @property {string} fromUserName
 * @property {string} toUserId
 * @property {string} toUserName
 * @property {number} amount
 */

/**
 * @typedef {'food' | 'transport' | 'accommodation' | 'entertainment' | 'shopping' | 'utilities' | 'other'} ExpenseCategory
 */

/**
 * @typedef {Object} AppState
 * @property {User|null} currentUser
 * @property {boolean} isAuthenticated
 * @property {Group[]} groups
 * @property {Expense[]} expenses
 * @property {Settlement[]} settlements
 * @property {string|null} selectedGroupId
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated
 * @property {User|null} currentUser
 * @property {User[]} users
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */
