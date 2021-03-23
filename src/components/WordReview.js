import { useState } from "react";
import { db } from "../firebase";
import Word from "./Word";

function WordReview({ words, languages }) {
  const [translation, setTranslation] = useState([]);
  const [activeWord, setActiveWord] = useState("");

  const handleClickWord = (word) => {
    setActiveWord(word);
    db.collection("words")
      .get()
      .then((querySnapshot) => {
        const tempArray = [];
        querySnapshot.forEach((doc) => {
          const idGoodFormat = doc.id.charAt(0).toUpperCase() + doc.id.slice(1);
          if (languages.includes(idGoodFormat))
            tempArray.push({ word: doc.data()[word], lang: idGoodFormat });
        });
        setTranslation(tempArray);
      });
  };

  return (
    <div className="word-review-block">
      <div className="word-review-original">
        <h3>Your words</h3>
        {words.map((w) => (
          <Word
            key={w}
            word={w}
            handleClickWord={() => handleClickWord(w)}
            isActive={w === activeWord}
          />
        ))}
      </div>
      <div className="word-review-translation">
        {translation.map((w) => (
          <Word key={w.word} word={`${w.lang} - ${w.word}`} />
        ))}
      </div>
    </div>
  );
}

export default WordReview;
