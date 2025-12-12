import { useState } from "react";
import type { Cycle, PomodoroProps, withPomodoroType } from "./types";
import { useTimer } from "react-timer-hook";

import {
  nowPlus,
  playBeep,
  generateUniqueId,
  FIVE_MINUTES_IN_SECONDS,
  TWENTY_FIVE_MINUTES_IN_SECONDS,
} from "./helpers";

// eslint-disable-next-line react/display-name
const withPomodoro: withPomodoroType = (Component) => () => {
  const [isStart, setIsStart] = useState(true);
  const [studying, setStudying] = useState(true);
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const done = () => {
    setIsStart(true);

    setStudying((oldState) => {
      const newState = !oldState;
      const time = nowPlus(newState ? TWENTY_FIVE_MINUTES_IN_SECONDS : FIVE_MINUTES_IN_SECONDS);
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
  };

  const { minutes, seconds, start, pause, resume, restart, isRunning } = useTimer({
    autoStart: false,
    expiryTimestamp: nowPlus(TWENTY_FIVE_MINUTES_IN_SECONDS),
    onExpire: () => {
      done();
      playBeep();
    },
  });

  const deleteCycle = (id: string) => {
    setCycles((oldCycles) => oldCycles.filter((cycle) => cycle.id !== id));
  };

  const deleteAllCycles = () => {
    setCycles([]);
  };

  const internalStart = () => {
    setIsStart(false);
    start();
  };

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
