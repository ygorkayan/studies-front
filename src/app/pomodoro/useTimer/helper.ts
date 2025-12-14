import { useEffect, useRef } from "react";

export type TimeFromMillisecondsType = {
  seconds: number;
  minutes: number;
};

export type useTimerSettingsType = {
  expiryTimestamp: Date;
  onExpire?: () => void;
  autoStart?: boolean;
};

export type useTimerResultType = TimeFromMillisecondsType & {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (newExpiryTimestamp: Date, newAutoStart?: boolean) => void;
  isRunning: boolean;
};

export function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  // update callback function with current render callback that has access to latest props and state
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      callbackRef?.current?.();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}

export class Validate {
  static expiryTimestamp(expiryTimestamp: Date) {
    const isValid = new Date(expiryTimestamp).getTime() > 0;
    if (!isValid) {
      console.warn("react-timer-hook: { useTimer } Invalid expiryTimestamp settings", expiryTimestamp);
    }
    return isValid;
  }

  static onExpire(onExpire: () => void) {
    const isValid = onExpire && typeof onExpire === "function";
    if (onExpire && !isValid) {
      console.warn("react-timer-hook: { useTimer } Invalid onExpire settings function", onExpire);
    }
    return isValid;
  }
}

export class Time {
  static getTimeFromMilliseconds(millisecs: number, isCountDown = true): TimeFromMillisecondsType {
    const totalSeconds = isCountDown ? Math.ceil(millisecs / 1000) : Math.floor(millisecs / 1000);
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      seconds,
      minutes,
    };
  }

  static getMillisecondsFromExpiry(expiry: Date): number {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry?.getTime() - now;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }
}
