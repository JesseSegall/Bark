const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
//const { addRequest } = require('./requests');
//const { requests } = require('.');

let exportedMethods = {
	async addOwner(firstName, lastName, email, userName, password, gender) {
		const usersCollection = await users();
		const attemptedUsername = userName.trim();
		const attemptedEmail = email.toLowerCase();
		if (!firstName || firstName == '')
			throw `First name must not be empty or contain just an empty string.`;
		if (!lastName || lastName === '')
			throw `Last name must not be empty or contain just an empty string.`;
		if (!email || email === '') throw `Email must not be empty or contain just an empty string.`;
		if (!userName || userName === '')
			throw `Username must not be empty or contain just an empty string.`;
		if (!password || password === '')
			throw `Password must not be empty or contain just an empty string.`;
		let newOwner = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			address: {},
			userName: userName,
			password: password,
			picture: 'public/image/no_image.jpeg',
			dogs: [],
			reviews: [],
			gender: gender,
			owner: true,
			sitter: false,
		};
		const usernameTaken = await usersCollection.findOne({
			userName: attemptedUsername,
		});
		const emailTaken = await usersCollection.findOne({ email: attemptedEmail });
		if (usernameTaken) throw 'This username has already been taken.';
		if (emailTaken) throw 'This email address has already been used.';
		const insertOwner = await usersCollection.insertOne(newOwner);
		if (insertOwner.insertedCount === 0) throw 'Could not insert Owner';
		return await this.getOwner(insertOwner.insertedId.toString());
		//return "done"
	},

	async getOwner(id) {
		const usersCollection = await users();
		const owner = await usersCollection.findOne({ _id: ObjectId(id) });
		return owner;
	},

	async addSitter(firstName, lastName, email, userName, password, dogSize, difficultDog) {
		const usersCollection = await users();
		const attemptedUsername = userName.trim();
		const attemptedEmail = email.toLowerCase();
		if (!firstName || firstName == '')
			throw `First name must not be empty or contain just an empty string.`;
		if (!lastName || lastName === '')
			throw `Last name must not be empty or contain just an empty string.`;
		if (!email || email === '') throw `Email must not be empty or contain just an empty string.`;
		if (!userName || userName === '')
			throw `Username must not be empty or contain just an empty string.`;
		if (!password || password === '')
			throw `Password must not be empty or contain just an empty string.`;
		let newSitter = {
			firstName: firstName,
			lastName: lastName,
			address: {},
			email: email.toLowerCase(),
			userName: userName,
			password: password,
			idOfDogSat: [], //array
			picture: 'public/image/no_image.jpeg', //  TODO: Possibly add a default picture here
			price: {},
			reviewsId: [],
			requests: [],
			rating: [],
			dogSize: dogSize,
			difficultDog: difficultDog,
			owner: false,
			sitter: true,
		};
		const usernameTaken = await usersCollection.findOne({
			userName: attemptedUsername,
		});
		const emailTaken = await usersCollection.findOne({ email: attemptedEmail });
		if (usernameTaken) throw 'This username has already been taken.';
		if (emailTaken) throw 'This email address has already been used.';
		const insertSitter = await usersCollection.insertOne(newSitter);
		if (insertSitter.insertedCount === 0) throw 'Something wrong here in sitters.';
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
				{ sitter: { $eq: true } }
				// { projection: { firstName: 1, lastName: 1, price: 1, rating: 1, sitter: 1 } }
			)
			.toArray();
		return sittersArray;
	},

	async getOwner(id) {
		const usersCollection = await users();
		const owner = await usersCollection.findOne({ _id: ObjectId(id) });
		return owner;
	},
	async findUser(username) {
		const usersCollection = await users();
		const foundUser = await usersCollection.findOne({ userName: username });
		return foundUser;
	},
	async getRatings() {
		const starsTotal = 5;
		const usersCollection = await users();
		const sittersArray = await usersCollection
			.find({}, { projection: { rating: 1, sitter: 'true' } })
			.toArray();
		for (let rating of sittersArray) {
			const starPercentage = (sittersArray[rating] / starsTotal) * 100;
			// Round to nearest 100

			const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
		}
	},
	async filterPriceHighToLow() {
		const usersCollection = await users();
		const sittersHighLow = await usersCollection
			.find(
				{ sitter: { $eq: true } },
				{ projection: { firstName: 1, lastName: 1, price: 1, rating: 1, sitter: 1, dogSize: 1 } }
			)
			.sort({ price: 1 })
			.toArray();
		return sittersHighLow;
	},
	async filterPriceLowToHigh() {
		const usersCollection = await users();
		const sittersLowHigh = await usersCollection
			.find(
				{ sitter: { $eq: true } },
				{ projection: { firstName: 1, lastName: 1, price: 1, rating: 1, sitter: 1, dogSize: 1 } }
			)
			.sort({ price: -1 })
			.toArray();
		return sittersLowHigh;
	},
	async filterDogSizeSmall() {
		const usersCollection = await users();
		const dogSmall = await usersCollection
			.find({ dogSize: 'Small' })

			.toArray();
		return dogSmall;
	},
	async filterDogSizeMedium() {
		const usersCollection = await users();
		const dogMedium = await usersCollection
			.find({ dogSize: 'Medium' })

			.toArray();
		return dogMedium;
	},
	async filterDogSizeLarge() {
		const usersCollection = await users();

		const dogLarge = await usersCollection

			.find({ dogSize: 'Large' })

			.toArray();
		return dogLarge;
	},
	async filterDogDifficult() {
		const usersCollection = await users();

		const dogDifficult = await usersCollection.find({ difficultDog: { $eq: true } }).toArray();
		return dogDifficult;
	},
	async updateSitterProfile(userId, firstName, lastName, address, price) {
		const usersCollection = await users();

		const updateUser = await usersCollection.findOneAndUpdate(
			{
				_id: ObjectId(userId),
			},
			{
				$set: {
					firstName: firstName,
					lastName: lastName,
					address: {
						street: address.street,
						city: address.city,
						state: address.state,
						zip: address.zip,
						country: address.country,
					},
					price: {
						smallDog: price.smallDog,
						mediumDog: price.mediumDog,
						largeDog: price.largeDog,
						difficultDog: price.difficultDog,
					},
				},
			}
		);
		return;
	},
	async updateOwnerProfile(userId, firstName, lastName, address) {
		const usersCollection = await users();

		console.log('in update');
		const updateUser = await usersCollection.findOneAndUpdate(
			{
				_id: ObjectId(userId),
			},
			{
				$set: {
					firstName: firstName,
					lastName: lastName,
					address: {
						street: address.street,
						city: address.city,
						state: address.state,
						zip: address.zip,
						country: address.country,
					},
				},
			}
		);

		console.log('finished');
		return;
	},
	async findSitterByEmail(email) {
		const sitter = await usersCollection.findOne({ email: email });
		return sitter;
	},
};



module.exports = exportedMethods;
