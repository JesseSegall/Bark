const mongoCollections = require('../config/mongoCollections');
const requests = mongoCollections.requests;
const users = mongoCollections.users;
//const sitters = mongoCollections.sitters;
const { ObjectId } = require('mongodb');

let exportedMethods = {
	async addRequest(ownerId, sitterId, requestText, dogId) {
		let newRequest = {
			ownerId: ownerId,
			sitterId: sitterId,
			requestText: requestText,
			dogId: dogId,

			/*TODO
      message:{
        text field describing what the request is (Date, etc)
      }
      status{
        --> pending (Created by owner and assigned to sitter)
         - Accepted (Sitter accepted)
         - Declined (Sitter declined)
      }
      */
		};

		const usersCollection = await users();
		/*
    const sittersCollection = await sitters();
    */
		const requestsCollection = await requests();

		const insertRequest = await requestsCollection.insertOne(newRequest);
		if (insertRequest.insertedCount === 0) throw 'Could not insert Request';
		const requestId = newRequest._id.toString();
		console.log(requestId);
		const updateRequestsArray = await usersCollection.updateOne(
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

	async completeRequest(requestId) {

		const usersCollection = await users();
		const requestsCollection = await requests();

		//find sitterId using requestId and request collection
		const requestInfo = requestsCollection.findOne({_id: ObjectId(requestId)});
		const sitterId = requestInfo.sitterId;
		const dogId = requestInfo.dogId;

		//add dog to idOfDogsSat in sitter

		const updateSitterDogSat = await usersCollection.findOneAndUpdate(
			{
				_id: ObjectId(sitterId),
			},
			{
				$push: {
					idOfDogSat: dogId
				}
			}
		);

		//remove request from sitter

		const removeSitterRequest = await usersCollection.update(
			{
				_id: ObjectId(sitterId)
			},
			{
				$pull: {
					requests: requestId
				}
			}
		);

		//delete request from request collection

		const removeRequest = await requestsCollection.remove({_id: ObjectId(requestId)});


	},

	async cancelRequest(requestId) {
		const usersCollection = await users();
		const requestsCollection = await requests();

		//find sitterId using requestId and request collection
		const requestInfo = requestsCollection.findOne({_id: ObjectId(requestId)});
		const sitterId = requestInfo.sitterId;

		//remove request from sitter
		const removeSitterRequest = await usersCollection.update(
			{
				_id: ObjectId(sitterId)
			},
			{
				$pull: {
					requests: requestId
				}
			}
		);
		//delete request from request collection
		const removeRequest = await requestsCollection.remove({_id: ObjectId(requestId)});
	},
};

module.exports = exportedMethods;
