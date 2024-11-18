import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const intervalId = useRef(null); 

  
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);  4
      intervalId.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10); 
    }
  };

  
  const stop = () => {
    if (isRunning) {
      clearInterval(intervalId.current); 
      setIsRunning(false); 
    }
  };

  
  const reset = () => {
    clearInterval(intervalId.current); 
    setTime(0); 
    setIsRunning(false); 
  };

  
  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10); 
    const seconds = Math.floor((time / 1000) % 60); 
    const minutes = Math.floor((time / (1000 * 60)) % 60); 
    const hours = Math.floor(time / (1000 * 60 * 60)); 

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div >
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>

      
      {!isRunning ? (
        <button onClick={start} >
          Start
        </button>
      ) : (
        <button onClick={stop} >
          Stop
        </button>
      )}

     
      <button onClick={reset} >
        Reset
      </button>
    </div>
  );
};



export default Stopwatch;
