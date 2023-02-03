import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode) {
    setMode(newMode);
    history.push(newMode);
  }

  function back() {
    history.pop();
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}