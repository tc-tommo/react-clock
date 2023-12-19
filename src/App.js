import logo from './logo.svg';
import './App.css';

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
  


  return (
    <div className="App">
      <h1>Welcome to Gymnastics!</h1>
      <div id="clock">{currentTime}</div>
    </div>
  );
}



export default App;


