// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isCountdownOver, setIsCountdownOver] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isOver100Days, setIsOver100Days] = useState(false);

  useEffect(() => {
    if (targetDate) {
      const now = new Date();
      const then = new Date(targetDate);
      const difference = then - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      if (days > 100) {
        setIsOver100Days(true);
        setIsCountdownActive(false);
        return;
      } else {
        setIsOver100Days(false);
        setIsCountdownActive(true);
      }

      const interval = setInterval(() => {
        const now = new Date();
        const then = new Date(targetDate);
        const difference = then - now;

        if (difference <= 0) {
          clearInterval(interval);
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setIsCountdownOver(true);
          setIsCountdownActive(false);
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setCountdown({ days, hours, minutes, seconds });
          setIsCountdownOver(false);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [targetDate]);

  const handleDateChange = (e) => {
    setTargetDate(e.target.value);
    setIsCountdownOver(false);
  };

  const handleCancel = () => {
    setTargetDate('');
    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setIsCountdownOver(false);
    setIsCountdownActive(false);
    setIsOver100Days(false);
  };

  return (
    <div className="App">
      <h1>Countdown <span className="highlight">Timer</span></h1>
      <input type="datetime-local" onChange={handleDateChange} value={targetDate} />
      <button onClick={handleCancel}>
        {isCountdownOver || !isCountdownActive || isOver100Days ? 'Start Timer' : 'Cancel Timer'}
      </button>
      {isCountdownOver && (
        <div className="message">
          🎉 The countdown is over! What's next on your adventure? 🎉
        </div>
      )}
      {isOver100Days && (
        <div className="message">
           The selected time is more than 100 days from now. 
        </div>
      )}
      {isCountdownActive && !isOver100Days && (
        <div className="countdown">
          <div className="countdown-item">
            <span>{countdown.days}</span>
            <span className="label">Days</span>
          </div>
          <div className="countdown-item">
            <span>{countdown.hours}</span>
            <span className="label">Hours</span>
          </div>
          <div className="countdown-item">
            <span>{countdown.minutes}</span>
            <span className="label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span>{countdown.seconds}</span>
            <span className="label">Seconds</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
