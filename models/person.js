const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

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