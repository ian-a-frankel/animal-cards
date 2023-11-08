import React, { useEffect, useRef, useState } from 'react';

function useTimer() {
  const timeElapsed = useRef(25);
  const timerRef = useRef(null)
  const [shouldDisplay, setShouldDisplay] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)
  const [acceptDefeat, setAcceptDefeat] = useState(false)

  function startTimer() {
    if (timeElapsed.current > 10) {
      timeElapsed.current = 0
      setShouldDisplay(true)
      setShowGameOver(false)
      timerRef.current = setInterval(() => {

        if (timeElapsed.current >= 5) {
            stopTimer();
            return
          }

        runTimer()
        
      }, 100);
    }
  };

  function runTimer() {

    console.log(timeElapsed.current)
    if (timeElapsed.current >= 3) {
        stopTimer()
        setShowGameOver(true)
        return
    }

    timeElapsed.current += .1

  }

  function stopTimer() {
    
    clearInterval(timerRef.current);
    timeElapsed.current = 500
    timerRef.current = null
    console.log('stopped')
    setShouldDisplay(false)
    setShowGameOver(true)
    setAcceptDefeat(true)
    
  };

  

  return {
    
    timeElapsed,
    startTimer,
    stopTimer,
    timerRef,
    shouldDisplay,
    acceptDefeat

  };
};

export default useTimer;