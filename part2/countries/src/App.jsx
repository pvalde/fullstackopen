import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Matches from "./components/Matches";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState(null);
  const [queryResults, setQueryResults] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const onChangeQuery = (event) => {
    const currentQuery = event.target.value;
    setQuery(currentQuery);

    // update the list of results
    if (countries !== null) {
      const currentResult = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(currentQuery.toLowerCase());
      });
      setQueryResults(currentResult);
    }
  };
  return (
    <>
      <Filter query={query} onChange={onChangeQuery} />
      <Matches results={queryResults} />
    </>
  );
};

export default App;
