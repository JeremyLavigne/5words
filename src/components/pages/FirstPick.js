import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Word from "../Word";

function FirstPick() {
  const [allWords, setAllWords] = useState([]);
  const [userWords, setUserWords] = useState([]);

  useEffect(() => {
    db.collection("words")
      .doc("english")
      .get()
      .then((doc) => {
        setAllWords(Object.values(doc.data()));
      });
  }, []);

  const handleClickWord = (clickedWord) => {
    if (userWords.includes(clickedWord)) {
      const newWords = userWords.filter((w) => w !== clickedWord);
      setUserWords(newWords);
    } else {
      const newWords = userWords.concat(clickedWord);
      setUserWords(newWords);
    }
  };

  console.log(userWords);

  return (
    <div className="pick-page-main">
      <h3>Pick 5 words</h3>
      <div className="pick-page-words">
        {allWords.map((w) => (
          <Word
            key={w}
            word={w}
            handleClickWord={() => handleClickWord(w)}
            isActive={userWords.includes(w)}
          />
        ))}
      </div>
    </div>
  );
}

export default FirstPick;
