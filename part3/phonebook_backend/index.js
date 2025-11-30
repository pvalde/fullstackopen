const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (request, response) => {
  return request.body ? JSON.stringify(request.body) : "";
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    persons.length > 0
      ? Math.max(...persons.map((person) => Number(person.id)))
      : 0;
  return String(maxId + 1);
};

app.get("/info", (request, response) => {
  const date = new Date();
  const responseHtml =
    `<p>Phonebook has info for ${persons.length} people.</p>` +
    `<p>${date.toString()}</p>`;
  response.send(responseHtml);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    const errorMessage = {
      error:
        `${!body.name ? "name " : ""}` +
        `${!body.name && !body.number ? "and " : ""}` +
        `${!body.number ? "number " : ""}missing`,
    };
    return response.status(400).json(errorMessage);
  } else {
    if (persons.some((person) => body.name === person.name)) {
      return response.status(400).json({ error: "name must be unique" });
    }
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);
    response.json(person);
  }
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const personToDelete = persons.find((person) => person.id == id);
  persons = persons.filter((person) => person.id !== id);

  response.json(personToDelete).status(204);
});

const PORT = process.env.PERSONS_API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
