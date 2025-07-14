import { useState } from 'react'
import './App.css'

import PomodoroTimer from './components/PomodoroTimer';

function App() {
  const [sessions, setSessions] = useState(0);

  const handleSessionComplete = () => {
    setSessions((prev) => prev + 1);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pomodoro Tracker</h1>
      <PomodoroTimer onSessionComplete={handleSessionComplete} />
      <p className="text-lg">
        🎉 Sessions completed this run: {sessions}
      </p>
    </div>
  );

}

export default App
