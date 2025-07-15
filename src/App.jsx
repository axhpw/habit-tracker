import { useState, useEffect } from 'react'
import './App.css'

// import components
import PomodoroTimer from './components/PomodoroTimer';
import DevTool from './components/DevTool';

// import helpers
import { saveSession, getSessions } from './storage';

function App() {
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const sessions = getSessions();
    setSessions(sessions[today] || 0);
  }, []);

  const handleSessionComplete = () => {
    // setSessions((prev) => prev + 1);
    saveSession();
    const today = new Date().toISOString().split('T')[0];
    const sessions = getSessions();
    setSessions(sessions[today]);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pomodoro Tracker</h1>
      <PomodoroTimer onSessionComplete={handleSessionComplete} />
      <p className="text-lg">
        🎉 Today's Sessions: {sessions}
      </p>
      <DevTool/>
    </div>
  );

}

export default App
