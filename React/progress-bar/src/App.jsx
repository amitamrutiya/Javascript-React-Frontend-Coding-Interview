import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import "./App.css";
import { MAX } from "./utils/constants";

export default function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((val) => val + 0.1);
    }, 20);

    if (value >= MAX) {
      clearInterval(intervalId);
      return;
    }

    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <div className="app">
      <span>Progress Bar</span>
      <ProgressBar value={value} />
      <span>{value === MAX ? "Complete!" : "Loading..."}</span>
    </div>
  );
}
