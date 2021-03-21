import { useEffect, useState } from "react";
import { db } from "../../firebase";

function FirstPick() {
  const [allWords, setAllWords] = useState([]);

  console.log(db.collection("words-english"));

  useEffect(() => {
    db.collection("words-english")
      .get()
      .then((querySnapshot) => {
        const temporaryArray = [];
        querySnapshot.forEach((doc) => {
          temporaryArray.push(doc.data());
        });
        setAllWords(temporaryArray);
      });
  }, []);

  console.log(allWords);
  return <div>First Pick</div>;
}

export default FirstPick;
