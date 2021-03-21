function Language({ lang, handleClickLanguage, isActive }) {
  return (
    <div
      className={`word word--lang ${isActive && "word--picked"}`}
      onClick={handleClickLanguage}
    >
      <img
        className="flag"
        alt={lang.short}
        src={`https://www.countryflags.io/${lang.short}/flat/32.png`}
      />
      <div>{lang.name}</div>
    </div>
  );
}

export default Language;
