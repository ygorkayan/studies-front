import { useEffect, useState } from "react";
import type { Cycle, PomodoroProps, withPomodoroType } from "./types";
import { TWENTY_FIVE_MINUTES_IN_SECONDS, FIVE_MINUTES_IN_SECONDS, generateUniqueId, playBeep } from "./helpers";
import { formatTime } from "./components/PomodoroDisplay/helpers";

// eslint-disable-next-line react/display-name
const withPomodoro: withPomodoroType = (Component) => () => {
  const [studying, setStudying] = useState(true);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [isCountdownPaused, setIsCountdownPaused] = useState(false);
  const [value, setValue] = useState(TWENTY_FIVE_MINUTES_IN_SECONDS);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  const done = () => {
    setIsCountdownPaused(false);
    setIsCountdownRunning(false);
    setStudying((oldState) => !oldState);
    setValue(studying ? FIVE_MINUTES_IN_SECONDS : TWENTY_FIVE_MINUTES_IN_SECONDS);

    if (studying) {
      setCycles((oldCycles) => {
        const newState = [
          ...oldCycles,
          {
            id: generateUniqueId(),
            finishedAt: new Date(),
          },
        ];

        return newState;
      });
    }
  };

  const start = () => {
    setIsCountdownRunning(true);
    setIsCountdownPaused(false);
  };

  const pause = () => {
    setIsCountdownPaused(true);
    setIsCountdownRunning(false);
  };

  const resume = () => {
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
    if (!isCountdownRunning || isCountdownPaused) {
      return;
    }

    const interval = setInterval(() => {
      setValue((oldValue) => {
        document.title = `${formatTime(oldValue - 1)} - Pomodoro Timer`;

        if (oldValue === 0) {
          done();

          playBeep();
          const textWhenStudying = "Study session completed! Time for a break.";
          const textWhenOnBreak = "Break session completed! Time to study.";
          alert(studying ? textWhenStudying : textWhenOnBreak);

          return oldValue;
        }

        return oldValue - 1;
      });
    }, 1000);

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
