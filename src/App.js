import { useState } from "react";
import StartPage from "./components/pages/StartPage";
import LogPage from "./components/pages/LogPage";
import HomePage from "./components/pages/HomePage";

function App() {
  const [displayStart, setDisplayStart] = useState(true);
  const [displayLog, setDisplayLog] = useState(false);
  const [displayHome, setDisplayHome] = useState(false);

  const handleClickStart = () => {
    setDisplayStart(false);
    setDisplayLog(true);
  };

  const handleClickLog = () => {
    setDisplayHome(true);
    setDisplayLog(false);
  };

  const handleClickLogOut = () => {
    setDisplayStart(true);
    setDisplayHome(false);
  };

  return (
    <>
      {displayStart && <StartPage handleClickStart={handleClickStart} />}
      {displayLog && <LogPage handleClickLog={handleClickLog} />}
      {displayHome && <HomePage handleClickLogOut={handleClickLogOut} />}
    </>
  );
}

export default App;
