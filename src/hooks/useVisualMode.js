import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // const historyArray = [];
  
  function transition(newMode) {
    console.log('newMode: ',newMode);
    setMode(newMode);
    setHistory([prev, newMode]);
    console.log('history after push : ', history);
  }

  // console.log('history before pop: ', historyArray, historyArray.length);
  function back() {
    // console.log('history before pop: ', historyArray, historyArray.length);
    // historyArray.pop();
    // console.log('history after pop: ', historyArray, historyArray.length);
    // setMode(historyArray[historyArray.length - 1]);
  }

  return { mode, transition, back };
}