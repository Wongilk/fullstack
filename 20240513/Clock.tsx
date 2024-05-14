import { useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return <span>{currentTime.toLocaleTimeString()}</span>;
};

export default Clock;
