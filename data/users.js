const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

let exportedMethods = {
	async addOwner(firstName, lastName, email, userName, password) {
		const usersCollection = await users();
		const attemptedUsername = userName.trim();
		const attemptedEmail = email.toLowerCase();

		let newOwner = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			userName: userName,
			password: password,
			picture: null,
			dogs: [],
			reviews: [],
			owner: true,
			sitter: false,
		};
		const usernameTaken = await usersCollection.findOne({
			userName: attemptedUsername,
		});
		const emailTaken = await usersCollection.findOne({ email: attemptedEmail });
		if (usernameTaken) throw "This username has already been taken.";
		if (emailTaken) throw "This email address has already been used.";
		const insertOwner = await usersCollection.insertOne(newOwner);
		if (insertOwner.insertedCount === 0) throw "Could not insert Owner";
		return await this.getOwner(insertOwner.insertedId.toString());
		//return "done"
	},

	async getOwner(id) {
		const usersCollection = await users();
		const owner = await usersCollection.findOne({ _id: ObjectId(id) });
		return owner;
	},

	async addSitter(firstName, lastName, email, userName, password) {
		const usersCollection = await users();
		const attemptedUsername = userName.trim();
		const attemptedEmail = email.toLowerCase();
		let newSitter = {
			firstName: firstName,
			lastName: lastName,
			address: null,
			email: email.toLowerCase(),
			userName: userName,
			password: password,
			idOfDogSat: [], //array
			picture: null, //  TODO: Possibly add a default picture here
			price: null,
			reviewsId: [],
			requests: [],
			owner: false,
			sitter: true,
		};
		const usernameTaken = await usersCollection.findOne({
			userName: attemptedUsername,
		});
		const emailTaken = await usersCollection.findOne({ email: attemptedEmail });
		if (usernameTaken) throw "This username has already been taken.";
		if (emailTaken) throw "This email address has already been used.";
		const insertSitter = await usersCollection.insertOne(newSitter);
		if (insertSitter.insertedCount === 0)
			throw "Something wrong here in sitters.";
		return await this.getSitter(insertSitter.insertedId.toString());
	},

	async getSitter(id) {
		const usersCollection = await users();
		const sitter = await usersCollection.findOne({ _id: ObjectId(id) });
		return sitter;
	},

	async getAllUsers() {
		const usersCollection = await users();

		const allUsers = await usersCollection.find({}).toArray();

		for (i in allUsers) {
			allUsers[i]._id = allUsers[i]._id.toString();
		}

		return allUsers;
	},

	async getAllSitters() {
		const usersCollection = await users();
		const sittersArray = await usersCollection
			.find(
				{},
				{ projection: { firstName: 1, lastName: 1, price: 1, sitter: "true" } }
			)
			.toArray();
		return sittersArray;
	},
};

module.exports = exportedMethods;
