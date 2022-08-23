const mongoCollections = require("../config/mongoCollections");
const dogs = mongoCollections.dogs;
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addDog(
    ownerId,
    dogName,
    breed,
    weight,
    age,
    difficultyLevel,
    picture,
    sitterId
  ) {
    let newDog = {
      dogName: dogName,
      breed: breed,
      weight: weight,
      age: age,
      difficultyLevel: difficultyLevel,
      picture: picture,
    };

    const dogsCollection = await dogs();
    const userCollection = await users();

    const insertDog = await dogsCollection.insertOne(newDog);
    if (insertDog.insertedCount === 0) throw "Could not insert Dog";

    const dogId = insertDog.insertedId.toString();

    const dogPushed = await userCollection.findOneAndUpdate(
      {_id: ObjectId(ownerId)}, 
      {$push: {
        dogs: dogId
      }
    });

    //const testOwner = await ownersCollection.findOne();
    //console.log(testOwner._id);

/*     const updateOwnerArray = await ownersCollection.updateOne(
      { _id: ObjectId(ownerId) },
      { $push: { dogsOwned: insertDog.insertedId.toString() } }
    );
    const updateSitterArray = await sittersCollection.updateOne(
      { _id: ObjectId(sitterId) },
      { $push: { idOfDogSat: insertDog.insertedId.toString() } }
    ); */

    return await this.getDog(dogId);
  },

  async getDog(id) {
    const dogsCollection = await dogs();
    const dog = await dogsCollection.findOne({ _id: ObjectId(id) });
    return dog;
  },
};

module.exports = exportedMethods;
