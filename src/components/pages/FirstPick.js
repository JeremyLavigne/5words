import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Word from "../Word";
import Language from "../Language";

function FirstPick({ userId, setFirstConnection }) {
  const [allWords, setAllWords] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const [wordStepcomplete, setWordStepComplete] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    db.collection("words")
      .doc("english")
      .get()
      .then((doc) => {
        setAllWords(Object.values(doc.data()));
      });
    db.collection("languages")
      .get()
      .then((querySnapshot) => {
        const tempArray = [];
        querySnapshot.forEach((doc) => {
          tempArray.push(doc.data());
        });
        setAllLanguages(tempArray);
      });
  }, []);

  const handleClickWord = (clickedWord) => {
    if (userWords.length === 5) {
      if (userWords.includes(clickedWord)) {
        const newWords = userWords.filter((w) => w !== clickedWord);
        setUserWords(newWords);
      }
      return;
    }
    if (userWords.length > 5) {
      return;
    }
    if (userWords.includes(clickedWord)) {
      const newWords = userWords.filter((w) => w !== clickedWord);
      setUserWords(newWords);
    } else {
      const newWords = userWords.concat(clickedWord);
      setUserWords(newWords);
    }
  };

  const handleClickLanguage = (clickedLang) => {
    if (userLanguages.length === 5) {
      if (userLanguages.includes(clickedLang)) {
        const newLanguages = userLanguages.filter((l) => l !== clickedLang);
        setUserLanguages(newLanguages);
      }
      return;
    }
    if (userLanguages.length > 5) {
      return;
    }
    if (userLanguages.includes(clickedLang)) {
      const newLanguages = userLanguages.filter((w) => w !== clickedLang);
      setUserLanguages(newLanguages);
    } else {
      const newLanguages = userLanguages.concat(clickedLang);
      setUserLanguages(newLanguages);
    }
  };

  const handleClickPickWords = () => {
    if (userWords.length < 5) {
      setErrorMessage("You need to pick 5 words");
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 2000);
    } else {
      setWordStepComplete(true);
    }
  };

  const handleClickPickLanguages = () => {
    if (userLanguages.length < 5) {
      setErrorMessage("You need to pick 5 languages");
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 2000);
    } else {
      console.log("ok");
      db.collection("users")
        .doc(userId)
        .set({
          firstConnection: false,
          words: userWords,
          languages: userLanguages,
        })
        .then(() => setFirstConnection(false))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="pick-page-main">
      {wordStepcomplete ? (
        <>
          <h3>Pick 5 languages</h3>
          <div className="pick-page-words">
            {allLanguages.map((l) => (
              <Language
                key={l.name}
                lang={l}
                handleClickLanguage={() => handleClickLanguage(l.name)}
                isActive={userLanguages.includes(l.name)}
              />
            ))}
          </div>
          <button className="btn btn-pick" onClick={handleClickPickLanguages}>
            Pick Languages
          </button>
        </>
      ) : (
        <>
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
          <button className="btn btn-pick" onClick={handleClickPickWords}>
            Pick Words
          </button>
        </>
      )}
      {displayError && <div>{errorMessage}</div>}
    </div>
  );
}

export default FirstPick;
