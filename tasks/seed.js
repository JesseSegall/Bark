const dbConnection = require('../config/mongoConnection');
const users = require('../data/users');
const data = require('../data');
const dogs = require('../data/dogs');
const { ObjectId } = require("mongodb");
//const sitters = data.sitters;
const reviews = data.reviews;
//const dogs = data.dogs;
//const owners = data.owners;
const requests = data.requests;
// TODO: add more to this seed, more owners, sitters, dogs. Double check all fields so they match

async function main() {
	const db = await dbConnection.dbConnection();
	await db.dropDatabase();

	const sitter = await users.addSitter(
		'James',
		'Kirk',
		'jkirk@gmail.com',
		'jimmyK',
		'willbeahashedpw',
		["small", "medium"],
		'no',
	);
	const sitterId = sitter._id.toString();
	const sitter1 = await users.addSitter(
		'Robert',
		'Matthews',
		'robert@gmail.com',
		'robert',
		'willbeahashedpw',
		["small", "medium", "large"],
		'yes',
	);
	const sitterId1 = sitter._id.toString();
	const sitter2 = await users.addSitter(
		'Patrick',
		'Star',
		'patrick@gmail.com',
		'patrick',
		'willbeahashedpw',
		["small"],
		'no',
	);
	const sitterId2 = sitter._id.toString();
	//console.log(sitterId);

	const owner = await users.addOwner(
		'Bob',
		'Smith',
		'bsmith@gmail.com',
		'bsmith',
		'willbehashedalso',
		'male'
	);

	const userProfileInsert = users.updateOwnerProfile(
		owner._id.toString(),
		'Bob',
		'Smith',
		{
			street: "215 Market St",
			city: "Paterson",
			state: "New Jersey",
			zip: "07023",
			country: "usa",
		},
	);

	const owner2 = await users.addOwner(
		'Timmy',
		'Crow',
		'tcrow@gmail.com',
		'tcrow',
		'willbehashedalso',
		'male'
	);

	const userProfileInsert2 = users.updateOwnerProfile(
		owner2._id.toString(),
		'Timmy',
		'Crow',
		{
			street: "31 brooklyn ave",
			city: "Jersey City",
			state: "New Jersey",
			zip: "07593",
			country: "usa",
		},
	);

	const ownerId2 = owner2._id.toString();
	const ownerId = owner._id.toString();

	/*const dog = await dogs.addDog(
		ownerId,
		'Shiloh',
		'beagle',
		'20',
		'5',
		'yes',
		'pictureShiloh.jpg',
	);
	const dogId = dog._id;*/
	const dogId = "fdsifupsahf";
	const dogId1 = "kbvwpjnmkvf";
	const dogId2 = "gfwkobvefb";

	const request = await requests.addRequest(
		ownerId,
		sitterId,
		'Are you available to sit Shiloh at 7pm tomorrow?',
		dogId
	);
	const request1 = await requests.addRequest(
		ownerId2,
		sitterId1,
		'Are you available to sit my dog at 2pm tomorrow?',
		dogId2
	);
	const request2 = await requests.addRequest(
		ownerId,
		sitterId2,
		'Are you available to sit my dog at 1pm tomorrow?',
		dogId1
	);
	const review1 = await reviews.addReview('This owner is awesome!', 5, sitterId, ownerId);
	const review2 = await reviews.addReview('This sitter is the best!', 5, ownerId, sitterId);
	const review3 = await reviews.addReview(
		'This sitter is really really good!',
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
