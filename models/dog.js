const mongoose = require("mongoose");

const dogSchema = mongoose.Schema({
  id: {
    type: String,
    min: 4,
    max: 10,
    require: true
  },
  dogName: {
    type: String,
    min: 2,
    require: true
  },
  gender: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  size: {
    type: String,
    require: true
  },
  graduation: {
    type: String,
    require: true
  },
  adopted: {
    type:Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
const dogTable = mongoose.model("dogs", dogSchema);


allDogs = () => {
  let p = new Promise((resolve, reject) => {
    dogTable.find()
      .then((dogs) => {
        if (dogs) return resolve(dogs)
        return reject(err)
      })
  })
  return p;
}

addDog = (dogObj) => {
  console.log(dogObj)
  let p = new Promise((resolve, reject) => {
    dogTable.findOne({ id: dogObj.id })
      .then((dog) => {
        if (dog) return reject("dog exsist");
        let newDog = dogTable({
          id: dogObj.id,
          dogName: dogObj.dogName,
          gender: dogObj.gender,
          image: dogObj.image,
          size: dogObj.size,
          graduation: dogObj.graduation

        });
        newDog.save();
        return resolve(newDog);
      });
  });
  return p;
};
removeDog = (dogData) => {
  let p = new Promise((resolve, reject) => {
    dogTable.findOne({ id: dogData.id }).deleteOne()
      .then((dog) => {
        if (dog) {
          if (dog.deletedCount > 0) {
            return resolve('dog removed')
          }
          else {
            return reject('dog not found')
          }
        }
        return reject('dog not found')
      })
      .catch((err) => {
        return reject({ err: err })
      })
  })
  return p;
}
adoptedDog = (data) => {
  let p = new Promise((resolve, reject) => {
    dogTable.findOne({ id: data.id })
      .then((dog) => {
        if (dog) {
          dog.adopted=true;
          dog.save();
          return resolve(dog)
        }
        else {
          return reject('dog not found')
        }
      })
      .catch((err) => {
        return reject({ err: err })
      })
  })
  return p;
}

module.exports = {
  allDogs: allDogs,
  addDog, addDog,
  removeDog: removeDog,
  adoptedDog: adoptedDog

};
