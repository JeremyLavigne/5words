import Word from "./Word";

function WordReview({ words }) {
  return (
    <div>
      <h3>Your words</h3>
      {words.map((w) => (
        <Word key={w} word={w} />
      ))}
    </div>
  );
}

export default WordReview;
