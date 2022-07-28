const mongoCollections = require("../config/mongoCollections");
const requests = mongoCollections.requests;
const sitters = mongoCollections.sitters;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addRequest(ownerId, sitterId, requestText, dogId) {
    let newRequest = {
      ownerId: ownerId,
      sitterId: sitterId,
      requestText: requestText,
      dogId: dogId,
    };

    const sittersCollection = await sitters();
    const requestsCollection = await requests();
    const insertRequest = await requestsCollection.insertOne(newRequest);
    if (insertRequest.insertedCount === 0) throw "Could not insert Request";
    const requestId = newRequest._id;
    console.log(requestId);
    const updateRequestsArray = await sittersCollection.updateOne(
      { _id: ObjectId(sitterId) },
      { $push: { requests: requestId } }
    );
    return await this.getRequest(insertRequest.insertedId.toString());
  },

  async getRequest(id) {
    const requestsCollection = await requests();
    const request = await requestsCollection.findOne({ _id: ObjectId(id) });
    return request;
  },
};

module.exports = exportedMethods;
