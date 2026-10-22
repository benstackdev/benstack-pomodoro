import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Pause, Play, SkipForward } from "lucide-react";
import { getSetting, SETTING_EVENT, SettingsKeys, type AlarmSoundsType } from "@/lib/settings";
import { playSound } from "react-sounds";

const TimerState = {
  READY: 0,
  RUNNING: 1,
  PAUSED: 2
};

export type TimerStateType = (typeof TimerState)[keyof typeof TimerState];

export type TimerProps = {
  focusTime: number,
  breakTime: number;
};

export function Timer() {
  const [focusTime, setFocusTime] = useState(Number(localStorage.getItem(SettingsKeys.FOCUS_TIME)));
  const [breakTime, setBreakTime] = useState(Number(localStorage.getItem(SettingsKeys.BREAK_TIME)));

  const [time, setTime] = useState<number>(focusTime);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [onBreak, setOnBreak] = useState<boolean>(false);

  const [timerState, setTimerState] = useState<TimerStateType>(TimerState.READY);

  // Play alarm sound
  const playAlarm = () => {
    const alarmSound = getSetting(SettingsKeys.ALARM_SOUND) as AlarmSoundsType;

    switch (alarmSound) {
      case "bell":
        playSound("/sounds/bell.mp3");
        break;
      case "digital":
        playSound("/sounds/digital.mp3");
        break;
    }
  };

  const timeFinished = useCallback(() => {
    setTimerState(TimerState.READY);
    setSessionCount(onBreak ? sessionCount + 1 : sessionCount);
    setTime(onBreak ? focusTime : breakTime);
    setOnBreak(!onBreak);
    playAlarm();
  }, [onBreak, sessionCount, focusTime, breakTime, setOnBreak, setTimerState, setSessionCount]);

  // Update timer
  const updateTimer = useCallback(() => {
    if (time === 0) {
      timeFinished();
      return;
    }
    setTime(time - 1);
  }, [time, timeFinished]);

  // Update timer state
  const updateTimerState = () => {
    if (timerState === TimerState.RUNNING)
      setTimerState(TimerState.PAUSED);
    else setTimerState(TimerState.RUNNING);
  };

  const updateSettingsState = () => {
    setFocusTime(Number(localStorage.getItem(SettingsKeys.FOCUS_TIME)));
    setBreakTime(Number(localStorage.getItem(SettingsKeys.BREAK_TIME)));

    if (timerState === TimerState.READY) {
      setTime((onBreak) ? Number(localStorage.getItem(SettingsKeys.BREAK_TIME)) : Number(localStorage.getItem(SettingsKeys.FOCUS_TIME)));
    }
  };

  // Get timer display
  const timerDisplay = (): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    if (timerState === TimerState.RUNNING) {
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [updateTimer, timerState]);

  useEffect(() => {
    window.addEventListener(SETTING_EVENT, updateSettingsState);
    return () => window.removeEventListener(SETTING_EVENT, updateSettingsState);
  });

  return (
    <Card className={cn("mt-4 transition duration-250 ring-0",
      onBreak ?
        timerState !== TimerState.RUNNING ? "bg-(--background-timer-break)" : "bg-(--background-timer-break-running)"
        : timerState !== TimerState.RUNNING ? "bg-(--background-timer)" : "bg-(--background-timer-running)"
    )}>
      <CardContent className={cn("flex flex-col items-center gap-y-4")}>
        <div className={cn("text-4xl")}>
          {onBreak ? `Break #${sessionCount}` : `Session #${sessionCount}`}
        </div>
        <div className={cn("text-7xl font-mono")}>
          {timerDisplay()}
        </div>
        <div className={cn("mt-4 grid grid-cols-[1fr_2fr_1fr] justify-items-center w-full max-w-xs")}>
          <Button variant="outline" className={cn("text-2xl min-w-30 h-14 col-start-2")} onClick={updateTimerState}>
            {timerState === TimerState.RUNNING
              ? (
                <div className={cn("flex flex-row items-center gap-x-2")}>
                  <Pause className={cn("size-6")} />
                  PAUSE
                </div>
              )
              : (
                <div className={cn("flex flex-row items-center gap-x-2")}>
                  <Play className={cn("size-6")} />
                  START
                </div>
              )}
          </Button>
          <Button
            variant="ghost"
            className={cn("h-14", timerState !== TimerState.RUNNING ? "hidden" : "")}
            onClick={timeFinished}
          >
            <SkipForward className={cn("size-6")} />
          </Button>
        </div>
      </CardContent>
    </Card >
  );
}