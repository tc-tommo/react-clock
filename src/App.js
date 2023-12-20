import './App.css';
import { upcomingToday, upcomingTomorrow, upcomingNextWeek, upcomingThisWeek, getEvents } from './icsParser';

import React, { useState, useEffect } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb0p1E-XCBQYQJNrAJvxU9Jt2kQ16J2Ss",
  authDomain: "tommo-react-clock.firebaseapp.com",
  projectId: "tommo-react-clock",
  storageBucket: "tommo-react-clock.appspot.com",
  messagingSenderId: "958665860360",
  appId: "1:958665860360:web:b24743610478d3ac7f78bd",
  measurementId: "G-806FZP42EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function App() {

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    fetch('./socials.ics')
      .then(response => response.text())
      .then(data => getEvents(data))
      .catch(error => console.error('Error loading ics file:', error));
  }, []);

  useEffect(
    () => {
      const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString())
        
      
      }, 1000);
      return () => {
        clearInterval(timer)
      }
    },
    []
  );

  function formatCurrentTime(currentTime) {
    // split into hours, minutes, seconds
    const [hours, minutes, seconds] = currentTime.split(":");
    
    return (
      <div id="time">
        <span id="hours">{hours}</span>
        :
        <span id="minutes">{minutes}</span>
        :
        <span id="seconds">{seconds}</span>
      </div>
    );
  }

  function formatEventSummary(events, timecategory) {
    if (events.length > 0) {
      return (
        <div id={timecategory}>
          <h2>{timecategory}</h2>
          {events.map(event => (
            <p key={event.start}>
              {event.summary}
            </p>
          ))}
        </div>
      );
    }
    return null;

  }
  
  return (
    <div className="App">
      <h1>Welcome to Gymnastics!</h1>
      <div id="clock">{formatCurrentTime(currentTime)}</div>
      <div id="events">
      <div id="today">
      {formatEventSummary(upcomingToday(), "Today")}
      </div>
      <div id="tomorrow">
      {formatEventSummary(upcomingTomorrow(), "Tomorrow")}
      </div>
      <div id="thisweek">
      {formatEventSummary(upcomingThisWeek(), "This Week")}
      </div>
      <div id="nextweek">
      {formatEventSummary(upcomingNextWeek(), "Next Week")}
      </div>
    </div>

  </div>
  );
}



export default App;


