require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

morgan.token('request-body', (request, response) => {
    const body = request.body;
    return JSON.stringify({name: body.name, number: body.number});
});

app.post('*', morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body'
));
app.get('*', morgan('tiny'));
app.delete('*', morgan('tiny'));

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/info', (request, response) => {
    const dateTime = new Date();

    response.send(
        `<p>phonebook has info for ${persons.length} people</p>` +
        `<p>${dateTime}</p>`
    );
});

app.get('/api/persons', (request, response) => {
    Person.find({})
      .then(persons => {
        response.json(persons);
      });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end();
      })
      .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({ 
        error: 'name or number missing'
      });
    };

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save()
      .then(savedPerson => {
        response.json(savedPerson);
      });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
