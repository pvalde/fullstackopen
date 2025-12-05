require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

morgan.token("body", (request, response) => {
  return request.body ? JSON.stringify(request.body) : "";
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  }

  next(error);
}

const checkNameAndNumber = (body => {
  if (!body.name || !body.number) {
    const errorMessage = {
      error:
        `${!body.name ? "name " : ""}` +
        `${!body.name && !body.number ? "and " : ""}` +
        `${!body.number ? "number " : ""}missing`,
    };
    return errorMessage;
  } else {
    return 0;
  }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/info", (request, response, error) => {
  const date = new Date();
  Person.countDocuments({})
    .then(count => {
      const responseHtml =
        `<p>Phonebook has info for ${count} people.</p>` +
        `<p>${date.toString()}</p>`;
      response.send(responseHtml);
    })
    .catch(error => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((people) => {
    response.json(people);
  }).
    catch(error => next(error));
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
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then((result) => {
      response.json(person.toJSON());
    });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  const errorMessage = checkNameAndNumber(request.body);
  if (errorMessage !== 0) {
    return response.status(400).send(errorMessage);
  }

  const { name, number } = request.body;

  Person.findById(id)
    .then(person => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      })
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
