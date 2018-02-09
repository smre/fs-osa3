const express = require('express');
const app = express();

let persons = [
  {
    name: 'Hoffman Hicks',
    number: '(888) 474-3081',
    id: 0,
  },
  {
    name: 'Peggy Morgan',
    number: '(985) 441-3276',
    id: 1,
  },
  {
    name: 'Rosalyn Ochoa',
    number: '(853) 440-2267',
    id: 2,
  },
  {
    name: 'Hernandez Mayer',
    number: '(954) 485-2144',
    id: 3,
  },
  {
    name: 'Dawn Brewer',
    number: '(840) 493-2502',
    id: 4,
  },
  {
    name: 'Lana Barnett',
    number: '(951) 540-3583',
    id: 5,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo backend</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Puhelinluettelossa ${persons.length} ihmisen tiedot</p><p>${new Date()}</p>`);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
