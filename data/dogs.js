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
    picture
  ) {
    let newDog = {
      dogName: dogName,
      breed: breed,
      weight: weight,
      age: age,
      difficultyLevel: difficultyLevel,
      picture: "picture",
    };

    const dogsCollection = await dogs();
    console.log(`Success with dogs: ${dogsCollection}`);
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
    console.log("almost finished");
    const toReturn = await this.getDog(ownerId);
    return toReturn;
  },

  async getDog(id){
    const dogsCollection = await dogs();

    console.log("getDog1");
    const usersCollection = await users();
    const owner = await usersCollection.findOne({ _id: ObjectId(id) });
    console.log("getDog");
    
    console.log("getDogCollect");
    console.log(owner);
    const dogList = await dogsCollection.find({}).toArray();
    for(i= 0; i < dogs.length; i++) {
      console.log(dogs[i].dogName);
    }
    return dogList;
  
  /*
  async getDog(id){
    const dogsCollection = await dogs();
    console.log("got Dog");
    const usersCollection = await users();
    
    const owner = await usersCollection.findOne({_id: ObjectId(id)});
    console.log("getDog");

    console.log("getDogCollect");
    console.log(owner);
    const dogs = await dogsCollection.find({}).toArray();
    for(i = 0; i < dogs.length; i++){
      console.log(dogs[i].dogName);
    }
    return dogs;
    */
  }

};

module.exports = exportedMethods;
