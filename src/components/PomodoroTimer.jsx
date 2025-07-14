import { useState, useEffect } from 'react';

export default function PomodoroTimer({ onSessionComplete }) {
  const [sessionMinutes, setSessionMinutes] = useState(25); // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} | Pomodoro`;
    return () => {
      document.title = 'Pomodoro';
    };
  }, [timeLeft]);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000)
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onSessionComplete) {
        onSessionComplete();
      }
      alert("Pomodoro Session Complete!");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onSessionComplete]);

  // format time helper
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60 ).padStart(2, '0');
    return `${m}:${s}`
  };

  // handle session length change
  const adjustSession = () => {
    if (isRunning) return;
    const clamped = Math.max(1, sessionMinutes);
    setTimeLeft(clamped * 60);
  }

  return (
    <div className="flex flex-col items-center space-y-4 border p-4 rounded-md">
      <h2 className="text-xl font-bold">Pomodoro Timer</h2>

      <div className="flex items-center space-x-2">
        <label htmlFor="sessionLength">Session (min):</label>
        <input
          id="sessionLength"
          type="number"
          min="1"
          value={sessionMinutes}
          onChange={(e) => setSessionMinutes(Number(e.target.value))}
          className="border px-2 py-1 w-20"
          disabled={isRunning}
        />
        <button
          onClick={adjustSession}
          disabled={isRunning}
          className="bg-blue-500 text-white px-2 py-1 rounded disabled:opacity-50"
        >
          Set
        </button>
      </div>

      <div className="text-4xl font-mono">{formatTime(timeLeft)}</div>

      <div className="space-x-2">
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="bg-yellow-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(sessionMinutes * 60);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
