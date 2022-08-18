const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const users = mongoCollections.users;
const sitters = mongoCollections.sitters;
const owners = mongoCollections.owners;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addReview(text, rating, posterId, beingReviewedId) {
    console.log("review text: " + text);
    let newReview = {
      //sitterId: sitterId,
      text: text,
      rating: rating,
      posterId: posterId,
    };

    const reviewCollection = await reviews();
    const userCollection = await users();

    //const sittersCollection = await sitters();
    //const ownersCollection = await owners();
    // const sitterIds = await findOne({});

    const insertReview = await reviewCollection.insertOne(newReview);

    const reviewId = newReview._id;
    console.log(reviewId);
    const isSitter = await sittersCollection.find({ _id: posterId });
    const isOwner = await ownersCollection.find({ _id: posterId });
    if (isSitter) {
      const updateOwnerArray = await ownersCollection.updateOne(
        { _id: ObjectId(beingReviewedId) },
        { $push: { reviewsId: reviewId } }
      );
    }
    if (isOwner) {
      const updateSitterArray = await sittersCollection.updateOne(
        { _id: ObjectId(beingReviewedId) },
        { $push: { reviewsId: reviewId } }
      );
    }

    return await this.getReview(insertReview.insertedId.toString());
  },

  async getReview(id) {
    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({ _id: ObjectId(id) });
    return review;
  },
};

module.exports = exportedMethods;
