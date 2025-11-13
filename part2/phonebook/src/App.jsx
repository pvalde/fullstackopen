import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
    const filter = event.target.value;
    // avoid only whitespace chars in filter input
    if (filter.trim().length === 0) {
      setFilter("");
    } else {
      setFilter(filter);
    }
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
