import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
      setIntervalId(id);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalId);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>Time: {formatTime(time)}</h2>
      {!isRunning ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
