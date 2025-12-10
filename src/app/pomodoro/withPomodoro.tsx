import { useCallback, useEffect, useRef, useState } from "react";
import type { Cycle, PomodoroProps, withPomodoroType } from "./types";
import { TWENTY_FIVE_MINUTES_IN_SECONDS, FIVE_MINUTES_IN_SECONDS, generateUniqueId, playBeep } from "./helpers";
import { formatTime } from "./components/PomodoroDisplay/helpers";

// eslint-disable-next-line react/display-name
const withPomodoro: withPomodoroType = (Component) => () => {
  const lastTickTimestamp = useRef<number>(0);
  const [studying, setStudying] = useState(true);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [isCountdownPaused, setIsCountdownPaused] = useState(false);
  const [value, setValue] = useState(TWENTY_FIVE_MINUTES_IN_SECONDS);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  const done = useCallback(() => {
    setIsCountdownPaused(false);
    setIsCountdownRunning(false);

    setStudying((oldState) => {
      const newState = !oldState;
      setValue(oldState ? FIVE_MINUTES_IN_SECONDS : TWENTY_FIVE_MINUTES_IN_SECONDS);

      if (oldState) {
        setCycles((oldCycles) => {
          const newCycles = [
            ...oldCycles,
            {
              id: generateUniqueId(),
              finishedAt: new Date(),
            },
          ];

          return newCycles;
        });
      }
      return newState;
    });
  }, []);

  const start = () => {
    lastTickTimestamp.current = Date.now();
    setIsCountdownRunning(true);
    setIsCountdownPaused(false);
  };

  const pause = () => {
    setIsCountdownPaused(true);
    setIsCountdownRunning(false);
  };

  const resume = () => {
    lastTickTimestamp.current = Date.now();
    setIsCountdownPaused(false);
    setIsCountdownRunning(true);
  };

  const deleteCycle = (id: string) => {
    setCycles((oldCycles) => oldCycles.filter((cycle) => cycle.id !== id));
  };

  const deleteAllCycles = () => {
    setCycles([]);
  };

  useEffect(() => {
    document.title = "Pomodoro Timer";
  }, []);

  useEffect(() => {
    if (!isCountdownRunning || isCountdownPaused) {
      return;
    }

    const interval = setInterval(() => {
      setValue((oldValue) => {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - lastTickTimestamp.current) / 1000);

        if (diffInSeconds > 0) {
          lastTickTimestamp.current = now;
        }

        const newValue = Math.max(0, oldValue - diffInSeconds);

        document.title = `${formatTime(newValue)} - Pomodoro Timer`;

        if (newValue <= 0) {
          done();

          playBeep();
          const textWhenStudying = "Study session completed! Time for a break.";
          const textWhenOnBreak = "Break session completed! Time to study.";
          alert(studying ? textWhenStudying : textWhenOnBreak);
        }

        return newValue;
      });
    }, 1);

    return () => clearInterval(interval);
  }, [isCountdownRunning, isCountdownPaused, studying, done]);

  const props: PomodoroProps = {
    done,
    start,
    pause,
    value,
    resume,
    cycles,
    studying,
    deleteCycle,
    deleteAllCycles,
    isCountdownPaused,
    isCountdownRunning,
  };

  return <Component {...props} />;
};

export default withPomodoro;
