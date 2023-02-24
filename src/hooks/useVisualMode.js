import { useState } from "react";

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history ] = useState([initial]);
  
  function transition(newMode, replace=false) {
    if (replace) {
      // Remove last mode to replace it in the case of status mode
      history.pop();
    }
    setMode(newMode);
    history.push(newMode);
  }

  function back() {
    if (history.length >= 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } 
    
    if (history.length < 1) {
      transition(initial);
    }
  }

  return { mode, transition, back };
}