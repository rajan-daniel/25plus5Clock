import { useState, useRef } from "react";

export const Clock = () => {
    const running = useRef(false);

    if (running.current === false) {
        console.log(running.current);
    }

    const intervalRef = useRef(null);
    const [minutes, setMinutes] = useState(25)
    const [time, setTime] = useState(1500)

    const start = () => {
        running.current = true;
        console.log(running.current);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => { setTime((prev) => prev - 1) }, 1000)
    }

    const pause = () => {
        running.current = false;
        console.log(running.current);
        clearInterval(intervalRef.current);
    }

    const reset = () => {
        running.current = false;
        console.log(running.current);
        clearInterval(intervalRef.current);
        setMinutes(25);
        setTime(1500);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return (
        <>
            <TimeControl minutes={minutes} setMinutes={setMinutes} setTime={setTime} isRunning={running} />
            <h1>{formatTime(time)}</h1>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Stop</button>
            <button onClick={reset}>Reset</button>
        </>
    );
}

export const TimeControl = ({ minutes, setMinutes, setTime, isRunning }) => {
    return (
        <>
            <h1>Session Length</h1>
            <p>{minutes}</p>
            <button onClick={() => { if (isRunning.current === false) { setTime((minutes + 1) * 60); setMinutes((prev) => prev + 1); } }}>Increment</button>
            <button onClick={() => { if (isRunning.current === false) { setTime((minutes - 1) * 60); setMinutes((prev) => prev - 1); } }}>Decrement</button>
        </>
    );
}