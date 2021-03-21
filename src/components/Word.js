function Word({ word, handleClickWord, isActive }) {
  return (
    <div
      className={`word ${isActive && "word--picked"}`}
      onClick={handleClickWord}
    >
      {word}
    </div>
  );
}

export default Word;
