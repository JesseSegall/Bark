const mongoCollections = require("../config/mongoCollections");
const sitters = mongoCollections.sitters;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addSitter(
    firstName,
    lastName,
    address,
    email,
    userName,
    password,
    picture,
    price
  ) {
    let newSitter = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email.toLowerCase(),
      userName: userName,
      password: password,
      idOfDogSat: [], //array
      picture: picture,
      price: price,
      reviewsId: [],
      requests: [],
    };
    const sittersCollection = await sitters();
    const insertSitter = await sittersCollection.insertOne(newSitter);
    if (insertSitter.insertedCount === 0)
      throw "Something wrong here in sitters.";
    return await this.getSitter(insertSitter.insertedId.toString());
  },

  async getSitter(id) {
    const sittersCollection = await sitters();
    const sitter = await sittersCollection.findOne({ _id: ObjectId(id) });
    return sitter;
  },

  async getAll() {
    const sittersData = await sitters();
    const sittersList = await sittersData.find({}).toArray();
    return sittersList;
}

}

module.exports = exportedMethods;
