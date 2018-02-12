const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const Person = mongoose.model('Person', {
  name: String,
  number: String,
});

if (process.argv.length > 2 && process.argv.length <= 4) {
  const name = process.argv[2];
  const number = process.argv[3];

  console.log(`Lisätään henkilö ${name} numero ${number} luetteloon`);

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then(response => {
      console.log('Henkilö lisätty');
      mongoose.connection.close();
    });

} else {
  // no arguments
  Person
    .find({})
    .then(persons => {
      console.log('Puhelinluettelo:');
      for (let i in persons) {
        console.log(persons[i].name, persons[i].number);
      }
      mongoose.connection.close();
    });
}
