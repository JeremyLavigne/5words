import { useEffect, useState } from "react";
import { db } from "../../firebase";
import FirstPick from "./FirstPick";

function HomePage({ handleClickLogOut, user }) {
  const [loading, setLoading] = useState(true);
  const [firstConnection, setFirstConnection] = useState(false);
  const [userId, setUserId] = useState(user ? user.uid : "");

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
          setLoading(false);
        });
    }
  }, [userId]);

  console.log(userId, firstConnection);

  return (
    <main>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {firstConnection ? (
            <FirstPick />
          ) : (
            <div>
              Home Page
              <button className="btn btn-logout" onClick={handleClickLogOut}>
                Log Out
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default HomePage;
