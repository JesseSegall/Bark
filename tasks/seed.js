const dbConnection = require("../config/mongoConnection");
const users = require ("../data/users");
const data = require("../data");
const dogs = require("../data/dogs");
//const sitters = data.sitters;
const reviews = data.reviews;
//const dogs = data.dogs;
//const owners = data.owners;
const requests = data.requests;

async function main() {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  const sitter = await users.addSitter(
    "James",
    "Kirk",
    "53 baker street apt 4f nyc",
    "jkirk@gmail.com",
    "jimmyK",
    "will be a hashed pw",
    "picture.jpg",
    "50$",
    "3 days"
  );
  const sitterId = sitter._id.toString();
  //console.log(sitterId);

  const owner = await users.addOwner(
    "Bob",
    "Smith",
    "53 baker street apt 6f nyc",
    "bsmith@gmail.com",
    "bsmith",
    "will be hashed also",
    "pictureOfBob.jpg"
  );
  const owner2 = await users.addOwner(
    "Joey",
    "Appleseed",
    "101st st street apt 4d nyc",
    "japples@gmail.com",
    "appleJ",
    "will be hashed also",
    "pictureOfJoey.jpg"
  );
  const ownerId2 = owner2._id.toString();
  const ownerId = owner._id.toString();


  const dog = await dogs.addDog(
    ownerId,
    "Shiloh",
    "beagle",
    "20",
    "5",
    "aggressive",
    "pictureShiloh.jpg",
    sitterId
  );
  const dogId = dog._id;
  const request = await requests.addRequest(
    ownerId,
    sitterId,
    "Are you available to sit Shiloh at 7pm tomorrow?",
    dogId
  );
  const review1 = await reviews.addReview(
    "This owner is awesome!",
    5,
    sitterId,
    ownerId
  );
  const review2 = await reviews.addReview(
    "This sitter is the best!",
    5,
    ownerId,
    sitterId
  );
  const review3 = await reviews.addReview(
    "This sitter is really really good!",
    5,
    ownerId2,
    sitterId
  );
  //const getOwn = await owners.getOwner("62cdd8acff9b54f2f18686a2")
  //console.log(getOwn);
  //await sitters.console.log("Done seeding database");

  await dbConnection.closeConnection();
}

main();
