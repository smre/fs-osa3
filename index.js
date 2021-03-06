const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

morgan.token('json', function (req) { return JSON.stringify(req.body); });
app.use(
  morgan(
    ':method :url :json :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo backend</h1>');
});

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => {
      res.json(people.map(Person.format));
    });
});

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.format(person));
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({error: 'Bad ID'});
    });
});

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => {
      response.status(400).send({error: 'Bad ID'});
    });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({error: 'Name or number missing'});
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  });

  person
    .save()
    .then(savedPerson => {
      response.json(Person.format(savedPerson));
    })
    .catch(error => {
      response.status(400).json(error);
    });
});

app.put('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndUpdate(request.params.id, {number: request.body.number})
    .then(updatedPerson => {
      response.json(Person.format(updatedPerson));
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/info', (req, res) => {
  Person.find({})
    .then(people => {
      res.send(
        `<p>Puhelinluettelossa ${people.length} ihmisen tiedot</p><p>${new Date()}</p>`);
    })
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
