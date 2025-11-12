import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "39-44-5323523" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personsFiltered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleOnChangeInputName = (event) => {
    setNewName(event.target.value);
  };
  const handleOnChangeInputNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    // check if a person is already registered:
    if (persons.some((person) => person.name === newName)) {
      alert(`'${newName}' is already added to phonebook`);
      return;
    }

    // check if a number is already registered:
    if (persons.some((person) => person.number === newNumber)) {
      alert(`The number '${newNumber}' is already added to phonebook`);
      return;
    }
    // if not, add the new entry to the phonebook
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
      }),
    );
    setNewName("");
    setNewNumber("");
  };

  const handleOnChangeFilter = (event) => {
    // avoid whitespace values in filter:
    const filter = event.target.value.trim();
    setFilter(filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleOnChangeFilter} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleOnSubmit}
        newName={newName}
        onChangeName={handleOnChangeInputName}
        newNumber={newNumber}
        onChangeNumber={handleOnChangeInputNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsFiltered} />
    </div>
  );
};

export default App;
