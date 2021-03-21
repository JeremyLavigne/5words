import { useEffect, useState } from "react";
import { db } from "../../firebase";
import FirstPick from "./FirstPick";

function HomePage({ handleClickLogOut, user }) {
  const [loading, setLoading] = useState(true);
  const [firstConnection, setFirstConnection] = useState(true);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userData) => {
        setFirstConnection(userData.data().firstConnection);
        setLoading(false);
      });
  }, [user.uid]);

  console.log(firstConnection);

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
