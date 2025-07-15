// key for local storage
const STORAGE_KEY = 'habitApp';

// get the data or return an empty obj if it doesn't exist
function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { users: {} };
}

// save data obj back to local storage
// @param {Object} data
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// get all sessions from a user
// @param {string} userId
// @returns {Object} sessions by date
export function getSessions(userId = 'default') {
  const data = getData();
  return data.users[userId]?.sessions || {};
}

// save a completed session for today, increments the count by current date
// @param {string} userId
export function saveSession(userId = 'default') {
  const today = new Date().toISOString().split('T')[0];
  const data = getData();

  if (!data.users[userId]) {
    data.users[userId] = { sessions: {} };
  }

  const sessions = data.users[userId].sessions;
  sessions[today] = (sessions[today] || 0) + 1;

  saveData(data);
}

// get session count for specific date
// @param {string} date in YYYY-MM-DD format
// @param {string}  userId
// @returns {number}
export function getSessionCountForDate(date, userId = 'default') {
  const sessions = getSessions(userId);
  return sessions[date] || 0;
}

// clear all sessions for a user
// @param {string} userId
export function clearSessions(userId = 'default') {
  const data = getData();
  if (data.users[userId]) {
    data.users[userId].sessions = {};
    saveData(data);
  }
}

// get all saved user IDs
export function getAllUserIds() {
  const data = getData();
  return Object.keys(data.users);
}
