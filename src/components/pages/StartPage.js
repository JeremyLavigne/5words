import logo from "../../assets/logo.png";

function StartPage({ handleClickStart }) {
  return (
    <main>
      <h2 className="title">
        <span className="title-5words">
          <span className="five">5</span> words
        </span>

        <span className="title-5languages">
          <span className="five">5</span> languages
        </span>
      </h2>
      <div>
        <img src={logo} alt="app_logo" />
      </div>
      <div className="btn btn-start" onClick={handleClickStart}>
        Start
      </div>
    </main>
  );
}

export default StartPage;
