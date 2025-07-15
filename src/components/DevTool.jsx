import React, { useState, useEffect } from 'react';
import { getAllUserIds, getSessions, clearSessions } from './storage';

export default function DevTool() {
  const [userIds, setUserIds] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    const ids = getAllUserIds();
    setUserIds(ids);
    if (ids.length > 0 && !selectedUser) {
      setSelectedUser(ids[0]);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      const userSessions = getSessions(selectedUser);
      setSessions(userSessions);
    }
  }, [selectedUser]);

  const handleClear = () => {
    if (selectedUser) {
      clearSessions(selectedUser);
      setSessions({});
    }
  };

  const totalSessions = Object.values(sessions).reduce((sum, count) => sum + count, 0);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '2rem' }}>
      <h2>🛠️ Dev Tool</h2>

      <label>
        Select User:
        <select
          value={selectedUser}
          onChange={e => setSelectedUser(e.target.value)}
        >
          {userIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </label>

      <h3>Total Sessions: {totalSessions}</h3>

      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Sessions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sessions).map(([date, count]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{count}</td>
            </tr>
          ))}
          {Object.keys(sessions).length === 0 && (
            <tr>
              <td colSpan="2">No sessions found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleClear} style={{ marginTop: '1rem' }}>
        Clear Sessions for {selectedUser}
      </button>
    </div>
  );
}
