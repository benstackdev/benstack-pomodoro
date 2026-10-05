import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";

const TimerState = {
  READY: 0,
  RUNNING: 1,
  PAUSED: 2,
  DONE: 3
};

export type TimerStateType = (typeof TimerState)[keyof typeof TimerState];

export type TimerProps = {
  focusMinutes: number,
  focusSeconds: number,
  breakMinutes: number,
  breakSeconds: number;
};

export function Timer({
  focusMinutes: fminutes,
  focusSeconds: fseconds,
  breakMinutes: bminutes,
  breakSeconds: bseconds
}: TimerProps) {
  const [minutes, setMinutes] = useState<number>(fminutes);
  const [seconds, setSeconds] = useState<number>(fseconds);
  const [sessionCount, setSessionCount] = useState<number>(1);
  const [onBreak, setOnBreak] = useState<boolean>(false);

  const [timerState, setTimerState] = useState<TimerStateType>(TimerState.READY);

  // Update timer
  const updateTimer = useCallback(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        setTimerState(TimerState.DONE);
        setSessionCount(onBreak ? sessionCount + 1 : sessionCount);
        setMinutes(onBreak ? fminutes : bminutes);
        setSeconds(onBreak ? fseconds : bseconds);
        setOnBreak(!onBreak);
        return;
      }
      setSeconds(59);
      setMinutes(minutes - 1);
      return;
    }

    setSeconds(seconds - 1);
  }, [bminutes, bseconds, fminutes, fseconds, onBreak, sessionCount, minutes, seconds, setMinutes, setSeconds, setTimerState, setSessionCount, setOnBreak]);

  // Update timer state
  const updateTimerState = () => {
    if (timerState === TimerState.RUNNING)
      setTimerState(TimerState.PAUSED);
    else setTimerState(TimerState.RUNNING);
  };

  useEffect(() => {
    if (timerState === TimerState.RUNNING) {
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [updateTimer, timerState]);

  return (
    <Card className={cn("mt-4 transition duration-250 ring-0",
      onBreak ?
        timerState !== TimerState.RUNNING ? "bg-zinc-800" : "bg-emerald-950"
        : timerState !== TimerState.RUNNING ? "bg-zinc-800" : ""
    )}>
      <CardContent className={cn("flex flex-col items-center gap-y-4")}>
        <div className={cn("text-xl text-zinc-400")}>
          {onBreak ? `Break #${sessionCount}` : `Session #${sessionCount}`}
        </div>
        <div className={cn("text-7xl font-mono")}>
          {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </div>
        <Button className={cn("mt-4 text-xl w-1/3 min-w-30 h-12")} onClick={updateTimerState}>
          {timerState === TimerState.RUNNING
            ? (
              <div className={cn("flex flex-row items-center gap-x-2")}>
                <Pause className={cn("size-5")} />
                PAUSE
              </div>
            )
            : (
              <div className={cn("flex flex-row items-center gap-x-2")}>
                <Play className={cn("size-5")} />
                START
              </div>
            )}
        </Button>
      </CardContent>
    </Card>
  );
}