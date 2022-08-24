const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const users = mongoCollections.users;
const dogs = mongoCollections.dogs;
//const sitters = mongoCollections.sitters;
//const owners = mongoCollections.owners;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addReview(text, rating, posterId, beingReviewedId) {
    /* console.log("review text: " + text);
    console.log("review rating: " + rating);
    console.log("review posterId: " + posterId);
    console.log("review beingReviewedId: " + beingReviewedId); */
    let newReview = {
      beingReviewed: beingReviewedId,
      text: text,
      rating: rating,
      posterId: posterId,
    };

    const reviewCollection = await reviews();
    const userCollection = await users();
    const dogsCollection = await dogs();

    const insertReview = await reviewCollection.insertOne(newReview);

    const reviewId = insertReview.insertedId.toString();
    //console.log("review Id: " + reviewId);

    //const beingReviewedUser = await userCollection.findOne({_id: ObjectId(beingReviewedId)});
    //console.log("Being Reviewed: " + beingReviewedUser.firstName + beingReviewedUser.lastName);

    //const checkExists = await userCollection.find({firstName: {$exists: true}});

    const checkExists = await userCollection.find({_id: ObjectId(beingReviewedId)}, {_id: 1}).limit(1);


    //console.log(beingReviewedId);
    console.log(checkExists);
    
    if (checkExists == 1) {
      console.log("person");
      const reviewPushed = await userCollection.findOneAndUpdate(
        {_id: ObjectId(beingReviewedId)}, 
        {$push: {
          reviews: reviewId
        }
      });
    }
    else {
      console.log("dog");
      const reviewPushed = await dogsCollection.findOneAndUpdate(
        {_id: ObjectId(beingReviewedId)}, 
        {$push: {
          reviews: reviewId
        }
      });
    }
    
    return await this.getReview(beingReviewedId);
  },

  async getReview(id) {
    const reviewCollection = await reviews();
    const usersCollection = await users();
    /* console.log("id: " + id);
    console.log("here"); */
    
    const owner = await usersCollection.findOne({ _id: ObjectId(id) });
    //console.log("ownerID: " + owner._id);

    const reviewData = await reviewCollection.find({}, {projection: {_id: 1, text: 1, rating: 1, posterId: 1}}).toArray();
    //console.log("reviewData: " + reviewData);
    return reviewData;
  },

  async getUser(id) {
    const usersCollection = await users();

    const owner = await usersCollection.findOne({ dogs: id});
    console.log(owner.firstName);
    console.log(owner._id);

    return owner._id.toString();
  }
};

module.exports = exportedMethods;
