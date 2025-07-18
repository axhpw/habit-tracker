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

  // handle preset click
  const handlePresetClick = (minutes) => {
    if (isRunning) return;
    setSessionMinutes(minutes);
    setTimeLeft(minutes * 60);
  }

  return (
    <div className="w-full max-w-lg flex flex-col items-center space-y-4 border p-6 rounded-md">
      <h2 className="text-xl font-bold">Pomodoro Timer</h2>

      {/* Presets */}
      <div className="flex flex-nowrap gap-2 justify-center">
        <button
          onClick={() => handlePresetClick(25)}
          disabled={isRunning}
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Focus 25
        </button>
        <button
          onClick={() => handlePresetClick(50)}
          disabled={isRunning}
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Deep Work 50
        </button>
        <button
          onClick={() => handlePresetClick(15)}
          disabled={isRunning}
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Quick Sprint 15
        </button>
      </div>

      {/* Manual input */}
      <div className="flex items-center space-x-2">
        <label htmlFor="sessionLength">Custom (min):</label>
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
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Set
        </button>
      </div>

      <div className="text-4xl font-mono">{formatTime(timeLeft)}</div>

      <div className="space-x-2">
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(sessionMinutes * 60);
          }}
          className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded hover:bg-[#30363d]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
