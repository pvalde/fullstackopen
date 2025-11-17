import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ capital, weather }) => {
  if (!weather) return null;
  return (
    <div id={`${capital}Weather`}>
      <h2>Weather in {capital}</h2>
      Temperature {weather.current.temperature_2m}{" "}
      {weather.current_units.temperature_2m}
      <br />
      Wind {weather.current.wind_speed_10m}{" "}
      {weather.current_units.wind_speed_10m}
    </div>
  );
};

const View = ({ country }) => {
  const languages = country.languages;
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[1]}&current=temperature_2m,wind_speed_10m`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div className="CountryView">
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={languages[key]}>{languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} width="100%" />
      <Weather capital={country.capital} weather={weather} />
    </div>
  );
};

export default View;
