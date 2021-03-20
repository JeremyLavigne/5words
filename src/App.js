import { useState } from "react";

import logo from "./assets/logo.png";

function App() {
  const [displayStart, setDisplayStart] = useState(true);
  const [displayLog, setDisplayLog] = useState(false);
  const [displayHome, setDisplayHome] = useState(false);

  const handleClickStart = () => {
    setDisplayHome(false);
    setDisplayLog(true);
  };

  return (
    <main>
      <h2 className="title">
        <span className="title-5words">
          <span className="five">5</span> words
        </span>

        <span className="title-5languages">
          <span className="five">5</span> languages
        </span>
      </h2>
      <div>
        <img src={logo} alt="app_logo" />
      </div>
      <div className="btn btn-start" onClick={handleClickStart}>
        Start
      </div>
    </main>
  );
}

export default App;
