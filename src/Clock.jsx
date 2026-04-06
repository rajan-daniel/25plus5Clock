import { useState, useRef } from "react";

export const Clock = () => {
    const running = useRef(null);

    const intervalRef = useRef(null);
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
        setTime(1500);
    }

    return (
        <>
            <TimeControl time={time} setTime={setTime} isRunning={running} />
            <h1>{time}</h1>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Stop</button>
            <button onClick={reset}>Reset</button>
        </>
    );
}

export const TimeControl = ({ time, setTime, isRunning }) => {
    return (
        <>
            <h1>Session Length</h1>
            <p>{time}</p>
            <button onClick={() => { if (isRunning.current === false) { setTime((prev) => prev + 60) } }}>Increment</button>
            <button onClick={() => { if (isRunning.current === false) { setTime((prev) => prev - 60) } }}>Decrement</button>
        </>
    );
}