import { useState, useCallback, useEffect } from "react";
import { useInterval, Validate, Time, type useTimerSettingsType, type useTimerResultType } from "./helper";

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire = () => {},
  autoStart = true,
}: useTimerSettingsType): useTimerResultType {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [interval, setInterval] = useState<number | null>(1000);

  const handleExpire = useCallback(() => {
    if (Validate.onExpire(onExpire)) {
      onExpire();
    }
    setIsRunning(false);
    setInterval(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback((newExpiryTimestamp: Date, newAutoStart = true) => {
    setInterval(1000);
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setMilliseconds(Time.getMillisecondsFromExpiry(newExpiryTimestamp));
  }, []);

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + milliseconds);
    restart(time);
  }, [milliseconds, restart]);

  const start = useCallback(() => {
    if (didStart) {
      setMilliseconds(Time.getMillisecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [expiryTimestamp, didStart, resume]);

  useInterval(
    () => {
      const millisecondsValue = Time.getMillisecondsFromExpiry(expiryTimestamp);
      setMilliseconds(millisecondsValue);
      if (millisecondsValue <= 0) {
        handleExpire();
      } else if (interval && millisecondsValue < interval) {
        setInterval(millisecondsValue);
      }
    },
    isRunning ? interval : null
  );

  useEffect(() => {
    Validate.expiryTimestamp(expiryTimestamp);
  }, [expiryTimestamp]);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
}
