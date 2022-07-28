const mongoCollections = require("../config/mongoCollections");
const owners = mongoCollections.owners;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addOwner(
    firstName,
    lastName,
    address,
    email,
    userName,
    password,
    picture
  ) {
    let newOwner = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      userName: userName,
      password: password,
      dogsOwned: [],
      picture: picture,
      reviewsId: [],
    };
    const ownersCollection = await owners();
    const insertOwner = await ownersCollection.insertOne(newOwner);
    if (insertOwner.insertedCount === 0) throw "Could not insert Owner";
    return await this.getOwner(insertOwner.insertedId.toString());
    //return "done"
  },

  async getOwner(id) {
    const ownersCollection = await owners();
    const owner = await ownersCollection.findOne({ _id: ObjectId(id) });
    return owner;
  },
};

module.exports = exportedMethods;
