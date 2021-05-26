var mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true })

require('dotenv').config();

const { Schema, model } = mongoose;

  const personSchema = new Schema({
    name:  {type: String, required: true}, // String is shorthand for {type: String}
    age: Number,
    favoriteFoods: [String],
  });

let Person = new model("Person", personSchema);

const createAndSavePerson = (done) => {
  let personDocument = new Person({name: "Bhavin", age: 23, favoriteFoods: ["pav bhaji"]});
  return personDocument.save().then(res => {
      done(null, res);
  }).catch(err => done(err))
};

const createManyPeople = (arrayOfPeople, done) => {
  return Person.create(arrayOfPeople).then(res => {
    done(null, res)
  }).catch(err => done(err));
};

const findPeopleByName = (personName, done) => {

  return Person.find({name: personName}).then(res => done(null, res)).catch(err => done(err));
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;