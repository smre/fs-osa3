const mongoose = require('mongoose');
const mongoURL = require('../mongoURL');

const url = mongoURL.url();

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  number: String,
});

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id,
  };
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;