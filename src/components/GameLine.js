import { useState } from "react";

function GameLine({ name }) {
  const [numberOfLevelDone, setNumberOfLevelDone] = useState(0);

  const handleLevelDone = (level) => {
    setNumberOfLevelDone(level);
  };

  return (
    <div className="game-line">
      <div>{name}</div>
      <div
        className={`level-indicator ${numberOfLevelDone >= 1 && "level-done"}`}
        onClick={() => handleLevelDone(1)}
      ></div>
      <div
        className={`level-indicator ${numberOfLevelDone >= 2 && "level-done"}`}
        onClick={() => handleLevelDone(2)}
      ></div>
      <div
        className={`level-indicator ${numberOfLevelDone >= 3 && "level-done"}`}
        onClick={() => handleLevelDone(3)}
      ></div>
    </div>
  );
}

export default GameLine;
