import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
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
      const personToUpdate = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personsService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then((personUpdated) => {
            setPersons(
              persons.map((person) =>
                person.id === personUpdated.id ? personUpdated : person,
              ),
            );
            return personUpdated;
          })
          .then((personUpdated) => {
            setNotificationMessage(`${personUpdated.name}'s number updated`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.dir(error);
            if (error.status === 404) {
              setErrorMessage(
                `Information of ${personToUpdate.name} has already been removed from server`,
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== personToUpdate.id),
              );
            } else if (error.status === 400) {
              setErrorMessage(error.response.data.error);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
          });
      }
      return;
    }

    // check if a number is already registered:
    if (persons.some((person) => person.number === newNumber)) {
      alert(`The number '${newNumber}' is already added to phonebook`);
      return;
    }
    // if not, add the new entry to the phonebook
    personsService
      .create({ name: newName, number: newNumber })
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        return createdPerson;
      })
      .then((createdPerson) => {
        // send notification of successful operation
        setNotificationMessage(`Added ${createdPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        if (error.status === 400) {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      });
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

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .remove(id)
        .then((response) => {
          if (response.status == 204) {
            let updatedPersons = [];
            persons.map((person) => {
              if (person.id !== personToDelete.id) {
                updatedPersons.push(person);
              }
            });
            setPersons(updatedPersons);
          } else {
            throw new Error(response.status);
          }
        })
        .catch((error) =>
          console.log(
            "there was some error while removing ",
            personToDelete.name,
            ": ",
            error,
          ),
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="notification" message={notificationMessage} />
      <Notification className="error" message={errorMessage} />
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
      <Persons persons={personsFiltered} deleteFunc={handleDeletePerson} />
    </div>
  );
};

export default App;
