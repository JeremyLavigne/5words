import { useState } from "react";
import firebase from "../../firebase";
import "firebase/auth";

function LogPage({ handleUserIsLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Oups, something must be wrong..."
  );

  const resetInputs = () => {
    setPassword("");
    setPassword2("");
    setEmail("");
  };

  const handleClickLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleUserIsLogged(user);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setDisplayError(true);
        resetInputs();
        setTimeout(() => {
          setDisplayError(false);
        }, 2000);
      });
  };

  const handleClickSignIn = () => {
    if (password.length > 0 && password === password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          handleUserIsLogged(user);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
          setDisplayError(true);
          resetInputs();
          setTimeout(() => {
            setDisplayError(false);
          }, 2000);
        });
    } else {
      setDisplayError(true);
      resetInputs();
      setTimeout(() => {
        setDisplayError(false);
      }, 2000);
    }
  };

  return (
    <main className="main-log-page">
      <div>
        <div>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">Mail</label>
        </div>
        <div>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label">Pass</label>
        </div>
        {displayRegister && (
          <div>
            <input
              className="input"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label className="label">Pass*</label>
          </div>
        )}

        <button
          className="btn btn-login"
          onClick={displayRegister ? handleClickSignIn : handleClickLogin}
        >
          {displayRegister ? "Sign in" : "Log in"}
        </button>
      </div>

      {displayError && <div>{errorMessage}</div>}

      <div className="log-page-bottom">
        <div className="log-page-bottom-bloc">
          {displayRegister ? "Already registered ?" : "Not registered yet ?"}
          <button
            className="btn btn-logout"
            onClick={() => setDisplayRegister(!displayRegister)}
          >
            {displayRegister ? "Log in" : "Sign in"}
          </button>
        </div>

        <div className="log-page-bottom-bloc">
          Let me try before
          <button className="btn btn-logout">Try</button>
        </div>
      </div>
    </main>
  );
}

export default LogPage;
