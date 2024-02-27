import React, { useEffect, useRef, useState } from 'react'

const Timer = () => {
    const [counter, setCounter] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [isIntervalRunning, setIsIntervalRunning] = useState(false);
    const [hasPaused, setHasPaused] = useState(false);

    const interval = useRef();
    useEffect(()=>{
        if(counter > 0) {
            setTimer(counter);
        }else{
            clearInterval(interval.current);
        }
    },[counter]);

    function setTimer(timeInSec){
        if(timeInSec > 0){
            const hoursCalc = Math.floor(timeInSec / 3600);
            const minutesCalc = Math.floor((timeInSec - (hoursCalc * 3600)) / 60);
            const secondsCalc = timeInSec - (hoursCalc * 3600) - (minutesCalc * 60);
            const counter = timeInSec;
            setHours(hoursCalc);
            setMinutes(minutesCalc);
            setSeconds(secondsCalc);
            setCounter(counter);
        }
    }
    function startTimer (){
        let count = ((hours*3600) + (minutes*60) + +seconds);
        setCounter(count);
        interval.current= setInterval(() =>{            
            if(counter>=1){
                console.log(counter);
                setCounter(counter => counter-1);
            }else{
                clearInterval(interval.current);
            }
        },1000);
        setIsIntervalRunning(true);
        setHasPaused(false);
    }

    const pauseTimer = () =>{
        if(interval){
            clearInterval(interval);
            setIsIntervalRunning(false);
            setHasPaused(true);
        }
    }

    const resumeTimer = () =>{
        startTimer();
        setHasPaused(false);
    }

    const resetTimer = () =>{
        setTimer(0);
        clearInterval(interval);
        setIsIntervalRunning(false);
        setHasPaused(false);
    }
  return (<>
    {/* <div>Timer</div>
    <label>{counter}</label> */}
    <label>{counter}</label>
        <div className='container'>
            <div>Count Down Timer</div>
            <form name='form-timer' id='form-timer'>
            <div className='timer'>
                <div>
                    <div>Hours</div>
                    <input type="number" key={hours} value={hours} onChange={(e)=> {setHours(e.target.value)}}/>
                </div>
                <div>
                    <div>Minutes</div>
                    <input type="number" key={minutes} value={minutes} onChange={(e)=> {setMinutes(e.target.value)}}/>
                </div>
                <div>
                    <div>Seconds</div>
                    <input type="number" key={seconds} value={seconds} onChange={(e)=> {setSeconds(e.target.value)}}/>
                </div>
            </div>
            </form>
            <div className='buttons'>
            <button className='btn-start' onClick={startTimer}>Start</button>
                {/* {!isIntervalRunning && <button className='btn-start' onClick={startTimer}>Start</button>} */}
                {isIntervalRunning && <button className='btn-start' onClick={pauseTimer}>Pause</button>}
                {hasPaused && <button className='btn-start' onClick={resumeTimer}>Resume</button>}
                <button className='btn-reset' onClick={resetTimer}>Reset</button>
            </div>
        </div>
    </>
    
  )
}

export default Timer