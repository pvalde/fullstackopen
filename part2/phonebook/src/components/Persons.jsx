const Persons = ({ persons, deleteFunc }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteFunc(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
