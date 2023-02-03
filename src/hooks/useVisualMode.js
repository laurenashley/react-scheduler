import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode) {
    setMode(newMode);
    history.push(newMode);
  }

  function back() {
    console.log('hist lgth: ', initial, history.length, mode);
    // return to initial mode if only one mode left in history
    if (history.length >= 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } 
  }

  return { mode, transition, back };
}