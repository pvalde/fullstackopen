import View from "./View";
import { useState } from "react";

const Matches = ({ results }) => {
  switch (results) {
  }
  if (results === null) {
    return null;
  } else if (results.length === 0) {
    return <p>no results.</p>;
  } else if (results.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (results.length === 1) {
    return <View country={results[0]} />;
  } else {
    let counter = 0;
    return results.map((country) => (
      <CountryEntry
        key={country.name.common}
        country={country}
        index={counter++}
      />
    ));
  }
};

const CountryEntry = ({ country, index }) => {
  const [showView, setShowView] = useState(false);

  const handleShow = () => {
    if (showView) {
      setShowView(false);
    } else {
      setShowView(true);
    }
  };

  return (
    <div id={`${country.name.common}-Entry`} className="countryEntry">
      {country.name.common} {""}
      <button onClick={handleShow} index={index}>
        {showView ? "hide" : "show"}
      </button>
      {showView ? <View country={country} /> : null}
    </div>
  );
};

export default Matches;
