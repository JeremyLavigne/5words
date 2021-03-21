function HomePage({ handleClickLogOut }) {
  return (
    <main>
      Home Page
      <button className="btn btn-logout" onClick={handleClickLogOut}>
        Log Out
      </button>
    </main>
  );
}

export default HomePage;
