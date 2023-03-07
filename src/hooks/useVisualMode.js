import { useState } from "react";

export default function useVisualMode(initial) {
  const [ history, setHistory ] = useState([initial]);
  
  function transition(newMode, replace=false, back=false) {
    setHistory(prev => {
      const prevCopy = [...prev];

      /** removes last mode in history with current mode */
      /** ie. for modes coming after Saving or Deleting */
      if (replace) prevCopy.pop();
      /** add curr mode to state only if not going back */
      if (!back)   prevCopy.push(newMode);

      return prevCopy;
    });
  }

  function back() {
    if (history.length > 1) {
      transition(history[history.length - 1], true, true);
    } 
    
    if (history.length <= 1) {
      /** If nothing to go back to in history set to initial mode */
      transition(initial);
    }
  }

  /** pass last mode in history array via mode key */
  return { mode: history[history.length - 1], transition, back };
}