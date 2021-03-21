import { useState } from "react";
import StartPage from "./components/pages/StartPage";
import LogPage from "./components/pages/LogPage";
import HomePage from "./components/pages/HomePage";

function App() {
  const [displayStart, setDisplayStart] = useState(true);
  const [displayLog, setDisplayLog] = useState(false);
  const [displayHome, setDisplayHome] = useState(false);
  const [user, setUser] = useState(null);

  const handleClickStart = () => {
    setDisplayStart(false);
    setDisplayLog(true);
  };

  const handleUserIsLogged = (loggedUser) => {
    setDisplayHome(true);
    setDisplayLog(false);
    setUser(loggedUser);
  };

  const handleClickLogOut = () => {
    setDisplayStart(true);
    setDisplayHome(false);
    setUser(null);
  };

  return (
    <>
      {displayStart && <StartPage handleClickStart={handleClickStart} />}
      {displayLog && <LogPage handleUserIsLogged={handleUserIsLogged} />}
      {displayHome && (
        <HomePage handleClickLogOut={handleClickLogOut} user={user} />
      )}
    </>
  );
}

export default App;
