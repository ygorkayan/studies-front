import { useCallback, useState } from "react";
import type { Cycle, PomodoroProps, withPomodoroType } from "./types";
import useTimer from "./useTimer";

import {
  nowPlus,
  playBeep,
  generateUniqueId,
  FIFTY_MINUTES_IN_SECONDS,
  TEN_MINUTES_IN_SECONDS,
} from "./helpers";

// eslint-disable-next-line react/display-name
const withPomodoro: withPomodoroType = (Component) => () => {
  const [isStart, setIsStart] = useState(true);
  const [studying, setStudying] = useState(true);
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const done = useCallback(() => {
    setIsStart(true);

    setStudying((oldState) => {
      const newState = !oldState;
      const time = nowPlus(newState ? FIFTY_MINUTES_IN_SECONDS : TEN_MINUTES_IN_SECONDS);
      restart(time, false);

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

  const { minutes, seconds, start, pause, resume, restart, isRunning } = useTimer({
    autoStart: false,
    expiryTimestamp: nowPlus(FIFTY_MINUTES_IN_SECONDS),
    onExpire: () => {
      done();
      playBeep();
    },
  });

  const deleteCycle = useCallback((id: string) => {
    setCycles((oldCycles) => oldCycles.filter((cycle) => cycle.id !== id));
  }, []);

  const deleteAllCycles = useCallback(() => {
    setCycles([]);
  }, []);

  const internalStart = useCallback(() => {
    setIsStart(false);
    start();
  }, [start]);

  const time = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  document.title = `${time} - Pomodoro Timer`;

  const props: PomodoroProps = {
    time,
    done,
    pause,
    resume,
    cycles,
    isStart,
    studying,
    isRunning,
    deleteCycle,
    deleteAllCycles,
    start: internalStart,
  };

  return <Component {...props} />;
};

export default withPomodoro;
