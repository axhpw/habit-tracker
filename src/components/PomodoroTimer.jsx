import { useState, useEffect } from 'react';

export default function PomodoroTimer({ onSessionComplete }) {
  const defaultTime = 25 * 60; // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);

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

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60 ).padStart(2, '0');
    return `${m}:${s}`
  };

  return (
    <div className="flex flex-col items-center space-y-4 border p-4 rounded-md">
      <h2 className="text-xl font-bold">Pomodoro Timer</h2>
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
            setTimeLeft(defaultTime);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
