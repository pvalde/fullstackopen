const Matches = ({ results }) => {
  if (results === null) {
    return null;
  } else if (results.length === 0) {
    return <p>no results.</p>;
  } else if (results.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (results.length === 1) {
    const country = results[0];
    const languages = results[0].languages;
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h1>Languages</h1>
        <ul>
          {Object.keys(languages).map((key) => (
            <li key={languages[key]}>{languages[key]}</li>
          ))}
        </ul>
        <img src={country.flags.svg} width="100%" />
      </div>
    );
  } else {
    return results.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  }
};

export default Matches;
