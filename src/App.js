import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Tracks whether the stopwatch is running
  const intervalRef = useRef(null); // Ref to store interval ID

  // Start the stopwatch
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10ms
      }, 10); // Run every 10ms
    }
  };

  // Stop the stopwatch
  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current); // Clear interval
      setIsRunning(false);
    }
  };

  // Reset the stopwatch
  const reset = () => {
    clearInterval(intervalRef.current); // Clear interval
    setTime(0); // Reset time to 0
    setIsRunning(false); // Set running state to false
  };

  // Ensure interval cleanup on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time in HH:MM:SS.ms
  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stopwatch</h1>
      <h2 data-testid="time-display">Time:{formatTime(time)}</h2>

      {/* Conditionally render Start and Stop buttons */}
      {!isRunning ? (
        <button onClick={start} data-testid="start-button" style={buttonStyle}>
          Start
        </button>
      ) : (
        <button onClick={stop} data-testid="stop-button" style={buttonStyle}>
          Stop
        </button>
      )}

      {/* Reset button */}
      <button onClick={reset} data-testid="reset-button" style={buttonStyle}>
        Reset
      </button>
    </div>
  );
};

// Button styles
const buttonStyle = {
  padding: "10px 20px",
  margin: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Stopwatch;
