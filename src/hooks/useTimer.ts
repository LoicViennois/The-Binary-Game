import { useState, useRef, useCallback, useEffect } from 'react';

export function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    stop();
    const now = Date.now();
    startTimeRef.current = now;
    setElapsed(0);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsed(Date.now() - startTimeRef.current);
      }
    }, 16);
  }, [stop]);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
    startTimeRef.current = null;
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    elapsed,
    isRunning,
    start,
    stop,
    reset,
  };
}
