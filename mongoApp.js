var mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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
  return Person.findOne({favoriteFoods: food}).then(res => done(null, res)).catch(err => done(err));
};

const findPersonById = (personId, done) => {
  return Person.findById(personId).then(res => done(null, res)).catch(err => done(err));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  const person = Person.findById(personId).then(person => {
    person.favoriteFoods.push(foodToAdd);
     person.save().then(res => {
       return done(null, res);
     }).catch(err => {
       return done(err);
     })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  const filter = {name: personName};
  const update = {age: ageToSet};

  return Person.findOneAndUpdate(filter, update, {new: true}).then(res => {
    done(null, res);
  }).catch(err => {
    return done(err);
  })
};

const removeById = (personId, done) => {

  return Person.findByIdAndRemove(personId).then(res => {
    done(null, res);
  }).catch(err => {
    return done(err);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  return Person.remove({name: nameToRemove}).then(res => {
    done(null, res);
  }).catch(err => {
    return done(err);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  return Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select({ age: 0 }).exec().then(res => {
    done(null, res);
  }).catch(err => {
    return done(err);
  })

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