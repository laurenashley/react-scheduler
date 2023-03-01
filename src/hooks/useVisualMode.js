import { useState } from "react";

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  function removeLastModeInHistory() {
    // Remove last mode as setup to replace it 
    const newHistory = [...history].pop();
    setHistory(newHistory);
  }
  
  function transition(newMode, replace=false) {
    if (replace) {
      removeLastModeInHistory();
    }
    setMode(newMode);
    history.push(newMode);
  }

  function back() {
    if (history.length >= 1) {
      removeLastModeInHistory();
      setMode(history[history.length - 1]);
    } 
    
    if (history.length < 1) {
      transition(initial);
    }
  }

  return { mode, transition, back };
}