import { useState, useRef } from "react";

export const Clock = () => {
    const intervalRef = useRef(null);
    const [time, setTime] = useState(1500)

    const start = () => {
        intervalRef.current = setInterval(() => { setTime((prev) => prev - 1) }, 1000)
    }

    const pause = () => {
        clearInterval(intervalRef.current);
    }

    const reset = () => {
        setTime(1500)
    }

    return (
        <>
            <Break />
            <TimeControl time={time} setTime={setTime} />
            <h1>{time}</h1>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Stop</button>
            <button onClick={reset}>Reset</button>
        </>
    );
}

export const Break = () => {

    const [breakLength, setBreakLength] = useState(300)

    return (
        <>
            <h1>Break</h1>
            <h2>{breakLength}</h2>
            <button>Increment</button>
            <button>Decrement</button>
        </>
    );
}

export const TimeControl = ({ time, setTime }) => {
    return (
        <>
            <h1>Session Length</h1>
            <p>{time}</p>
            <button onClick={() => setTime((prev) => prev + 60)}>Increment</button>
            <button onClick={() => setTime((prev) => prev - 60)}>Decrement</button>
        </>
    );
}