const express = require('express');
const app = express();

app.use(express.json());

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
  
app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const dateTime = new Date();

    response.send(
        `<p>phonebook has info for ${persons.length} people</p>` +
        `<p>${dateTime}</p>`
    );
});

// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id);
//     const note = notes.find(note => note.id === id);

//     if (note) {
//       response.json(note);
//     } else {
//       response.status(404).end();
//     };
// });

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id);
//     notes = notes.filter(note => note.id !== id);
//     response.status(204).end();
// });

// const generateId = () => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => Number(n.id)))
//       : 0;
//     return String(maxId + 1);
// };

// app.post('/api/notes', (request, response) => {
//     const body = request.body;

//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing'
//       });
//     };

//     const note = {
//       content: body.content,
//       important: Boolean(body.important) || false,
//       id: generateId(),
//     };

//     notes = notes.concat(note);
//     response.json(note);
// });

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method);
//     console.log('Path:  ', request.path);
//     console.log('Body:  ', request.body);
//     console.log('---');
//     next();
// };
// app.use(requestLogger);

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' });
// };
// app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
