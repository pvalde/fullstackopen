import { useState } from "react";

// min and max are expected to be integers.
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const DisplayVote = ({ votes }) => {
  if (votes == 1) {
    return <p>has {votes} vote</p>;
  } else {
    return <p>has {votes} votes</p>;
  }
};

const DisplayAnecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{anecdote}</p>
      <DisplayVote votes={votes} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(
    getRandomInt(0, anecdotes.length - 1),
  );
  const [votes, setVotes] = useState(() => {
    /* create an Object that maps anecdotes IDs with ratings */
    let object = {};
    let i = 0;
    for (const _ of anecdotes) {
      object[i++] = 0;
    }
    return object;
  });

  const setSelectedAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1));
  };

  const addVote = (index) => {
    const copy = { ...votes };
    copy[index] += 1;
    setVotes(copy);
  };

  const getAnecdoteWithMostVotesIndex = () => {
    let max = 0;
    let index = 0;
    for (const [key, val] of Object.entries(votes)) {
      if (val > max) {
        max = val;
        index = key;
      }
    }
    return index;
  };

  return (
    <>
      <DisplayAnecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button onClick={() => addVote(selected)} text="vote" />
      <Button onClick={setSelectedAnecdote} text="next anecdote" />
      <DisplayAnecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[getAnecdoteWithMostVotesIndex()]}
        votes={votes[getAnecdoteWithMostVotesIndex()]}
      />
    </>
  );
};

export default App;
