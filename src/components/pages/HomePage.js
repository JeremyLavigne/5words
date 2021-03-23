import { useEffect, useState } from "react";
import { db } from "../../firebase";
import GameLine from "../GameLine";
import FirstPick from "./FirstPick";
import WordReview from "../WordReview";

function HomePage({ handleClickLogOut, user }) {
  const [loading, setLoading] = useState(true);
  const [firstConnection, setFirstConnection] = useState(false);
  const [userId, setUserId] = useState(user ? user.uid : "");
  const [userWords, setUserWords] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const [displayReview, setDisplayReview] = useState(false);

  useEffect(() => {
    setUserId(user ? user.uid : "");
  }, [user]);

  useEffect(() => {
    if (userId !== "") {
      db.collection("users")
        .doc(userId)
        .get()
        .then((userData) => {
          setFirstConnection(userData.data().firstConnection);
          setUserWords(userData.data().words);
          setUserLanguages(userData.data().languages);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <main>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {firstConnection ? (
            <FirstPick
              userId={userId}
              setFirstConnection={setFirstConnection}
            />
          ) : (
            <div className="home-page-main">
              <h2 className="title">
                <span className="title-5words">
                  <span className="five">{userWords.length}</span> words
                </span>

                <span className="title-5languages">
                  <span className="five">{userLanguages.length}</span> languages
                </span>
              </h2>

              {displayReview ? (
                <WordReview words={userWords} languages={userLanguages} />
              ) : (
                <>
                  <div className="game-block">
                    <GameLine name="Game 1" />
                    <GameLine name="Game 2" />
                    <GameLine name="Game 3" />
                  </div>

                  <div
                    className="review-word-block"
                    onClick={() => setDisplayReview(true)}
                  >
                    {"Review my words ->"}
                  </div>
                </>
              )}
              <button
                className="btn btn-logout"
                onClick={
                  displayReview
                    ? () => setDisplayReview(false)
                    : handleClickLogOut
                }
              >
                {displayReview ? "Back" : "Log Out"}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default HomePage;
