import React, { userState, useState, useEffect } from 'react';

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
}

const App = () => {
    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: null, y: null})
    const [status, setStatus] = useState(navigator.onLine);
    const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState);
    let mounted = true;

    useEffect(() => { // rendered after the state is changed
        document.title = `You have clicked ${count} times`;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        navigator.geolocation.getCurrentPosition(handleGeolocation) // does not have method to remove listener
        const watchId = navigator.geolocation.watchPosition(handleGeolocation)

        return () => { // replicate componentWillUnmount
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            navigator.geolocation.clearWatch(watchId);
            mounted = false;
        } // replacates componentDidUpdate
    }, [count]) // useEffect gets called after every re-render, now only on mount and unmount
    
    const handleGeolocation = event => {
        if (mounted) { // prevent memory leak
            setLocation({
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed
            })
        }
    }

    const handleOnline = () => {
        setStatus(true);
    }

    const handleOffline = () => {
        setStatus(false);
    }

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.pageX,
            Y: event.pageY
        })
    }

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    }

    const toggleLight = () => {
        setIsOn(prevIsOn => !prevIsOn)
    }

    return (
        <>
            <h2>Counter</h2>
            <button onClick={incrementCount}>I was clicked {count} times</button>

            <h2>Toggle Light</h2>
            <img 
            src={
                isOn ? 'https://icon.now.sh/highlight/fd0': 'https://icon.now.sh/highlight/aaa'
            }
            style={{
                height: "50px",
                width: "50px",
                
            }}
            alt="FlashLight"
            onClick={toggleLight}></img>

            <h2>Mouse Position</h2>
            {JSON.stringify(mousePosition, null, 2)}
            <br />

            <h2>Network Status</h2>
            <p>You are <strong>{status ? "online" : "offline"}</strong></p>

            <h2>Geolocation</h2>
            <p>Latitude is {latitude}</p>
            <p>Longitude is {longitude}</p>
            <p>Your speed is {speed ? speed : 0}</p>
      </>
    )
}

export default App;