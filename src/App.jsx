import { useState, useEffect } from 'react'

// import components
import PomodoroTimer from './components/PomodoroTimer';
import DevTool from './components/DevTool';
import Heatmap from './components/Heatmap';

// import helpers
import { saveSession, getSessions } from './helpers/storage';

// make sure my app styles come after any default styles
import 'react-calendar-heatmap/dist/styles.css';
import './App.css'

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
    <div>
      <div className="max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Streakeasy</h1>
        <PomodoroTimer onSessionComplete={handleSessionComplete} />
        <p className="text-lg">
          🎉 Today's Sessions: {sessions}
        </p>
      </div>
      <div className="w-full flex justify-center mt-12">
        <Heatmap/>
      </div>
    </div>
  );

}

export default App
