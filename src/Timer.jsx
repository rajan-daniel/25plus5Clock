import { useState, useRef } from "react";
import useSound from 'use-sound';
import alarmSound from './assets/alarm.mp3';

export const Timer = () => {
    const running = useRef(false);
    const onBreak = useRef(false);
    const isPaused = useRef(false);
    const [playAlarm] = useSound(alarmSound);

    if (running.current === false) {
        console.log(`timer is ${running.current}`);
    }

    if (onBreak.current === false) {
        console.log(`break is ${onBreak.current}`);
    }

    const intervalRef = useRef(null);
    const [minutes, setMinutes] = useState(25)
    const [time, setTime] = useState(1500)
    const [breakMinutes, setbreakMinutes] = useState(5);

    const start = () => {
        if (isPaused.current) {
            running.current = true;
            console.log(running.current);
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => { setTime((prev) => prev - 1) }, 1000)
            isPaused.current = false;
        } else {
            running.current = true;
            console.log(running.current);
            clearInterval(intervalRef.current);
            setTime((minutes) * 60);
            intervalRef.current = setInterval(() => { setTime((prev) => prev - 1) }, 1000)
        }
    }

    const startBreak = () => {
        if (isPaused.current) {
            running.current = true;
            console.log(running.current);
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => { setTime((prev) => prev - 1) }, 1000)
            isPaused.current = false;
        } else {
            running.current = true;
            console.log(running.current);
            clearInterval(intervalRef.current);
            setTime((breakMinutes) * 60);
            intervalRef.current = setInterval(() => { setTime((prev) => prev - 1) }, 1000)
        }
    }

    const pause = () => {
        isPaused.current = true;
        running.current = false;
        console.log(running.current);
        clearInterval(intervalRef.current);
    }

    const reset = () => {
        running.current = false;
        onBreak.current = false;
        console.log(running.current);
        clearInterval(intervalRef.current);
        setMinutes(25);
        setTime(1500);
        setbreakMinutes(5);
    }

    function drawTime(seconds) {
        if (time > 0) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;

            return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        } else {
            alertAndSwap();
        }
    }

    const alertAndSwap = () => {
        playAlarm();
        onBreak.current = !onBreak.current;
        if (onBreak.current) {
            startBreak();
        } else {
            start();
        }
    }

    return (
        <>
            <BreakTimeControl breakMinutes={breakMinutes} setbreakMinutes={setbreakMinutes} setTime={setTime} isRunning={running} onBreak={onBreak} />
            <TimeControl minutes={minutes} setMinutes={setMinutes} setTime={setTime} isRunning={running} onBreak={onBreak}/>
            <h1>{onBreak.current ? `On Break` : `In Session`}</h1>
            <h1>{drawTime(time)}</h1>
            <button onClick={onBreak.current ? startBreak : start}>Start</button>
            <button onClick={pause}>Stop</button>
            <button onClick={reset}>Reset</button>

            {/*<button onClick={alertAndSwap}>FORCE END DEBUG BUTTON</button>*/}
        </>
    );
}

export const TimeControl = ({ minutes, setMinutes, setTime, isRunning, onBreak}) => {
    return (
        <>
            <h1>Session Length</h1>
            <h1>{minutes}</h1>
            <button onClick={() => {
                if (isRunning.current === false) {
                    if (onBreak.current === false) {
                        setTime((minutes + 1) * 60);
                        setMinutes((prev) => prev + 1);
                    } else {
                        setMinutes((prev) => prev + 1);
                    }
                }
            }}>Increment</button>

            <button onClick={() => {
                if (isRunning.current === false && minutes > 1) {
                    if (onBreak.current === false) {
                        setTime((minutes - 1) * 60);
                        setMinutes((prev) => prev - 1);
                    } else {
                        setMinutes((prev) => prev - 1);
                    }
                }
            }}>Decrement</button>
        </>
    );
}

export const BreakTimeControl = ({ breakMinutes, setbreakMinutes, setTime, isRunning, onBreak }) => {
    return (
        <>
            <h1>Break Length</h1>
            <h1>{breakMinutes}</h1>
            <button onClick={() => {
                if (isRunning.current === false) {
                    if (onBreak.current) {
                        setTime((breakMinutes + 1) * 60);
                        setbreakMinutes((prev) => prev + 1);
                    } else {
                        setbreakMinutes((prev) => prev + 1);
                    }
                }
            }}>Increment</button>

            <button onClick={() => {
                if (isRunning.current === false && breakMinutes > 1) {
                    if (onBreak.current) {
                        setTime((breakMinutes - 1) * 60);
                        setbreakMinutes((prev) => prev - 1);
                    } else {
                        setbreakMinutes((prev) => prev - 1);
                    }
                }
            }}>Decrement</button>
        </>
    );
}