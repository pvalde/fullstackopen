import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = ((good * 1 + bad * -1) / all).toFixed(2);
  const positive_percentage = ((good / all) * 100).toFixed(2) + "%";

  if (all > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={positive_percentage} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
};

const Button = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addState = (state, setter) => {
    setter(state + 1);
  };

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={() => addState(good, setGood)} title="good" />
      <Button onClick={() => addState(neutral, setNeutral)} title="neutral" />
      <Button onClick={() => addState(bad, setBad)} title="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

function hola() {
  1;
}

export default App;
