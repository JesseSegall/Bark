const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const users = mongoCollections.users;
const sitters = mongoCollections.sitters;
const owners = mongoCollections.owners;
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async addReview(text, rating, posterId, beingReviewedId) {
    console.log("review text: " + text);
    console.log("review rating: " + rating);
    console.log("review posterId: " + posterId);
    console.log("review beingReviewedId: " + beingReviewedId);
    let newReview = {
      beingReviewed: beingReviewedId,
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

    const reviewId = insertReview.insertedId.toString;
    console.log(reviewId);

    const beingReviewedUser = await userCollection.findOne({_id: ObjectId(beingReviewedId)});
    console.log("Being Reviewed: " + beingReviewedUser);
    
/*     const reviewId = newReview._id;
    console.log(reviewId); */

/*     const isSitter = await sittersCollection.find({ _id: posterId });
    const isOwner = await ownersCollection.find({ _id: posterId });
    if (isSitter) {
      const updateOwnerArray = await ownersCollection.updateOne(
        { _id: beingReviewedId },
        { $push: { reviewsId: reviewId } }
      );
    }
    if (isOwner) {
      const updateSitterArray = await sittersCollection.updateOne(
        { _id: beingReviewedId },
        { $push: { reviewsId: reviewId } }
      );
    }
 */
    //return;
    console.log("newID: " + insertReview.insertedId.toString());
    //return await this.getReview(insertReview.insertedId.toString());
    return await this.getReview(beingReviewedId);
  },

  async getReview(id) {
    const reviewCollection = await reviews();
    const usersCollection = await users();
    console.log("id: " + id);
    console.log("here");
    
    const owner = await usersCollection.findOne({ _id: ObjectId(id) });
    console.log("ownerID: " + owner._id);

    const reviewData = await reviewCollection.find({}, {projection: {_id: 1, text: 1, rating: 1, posterId: 1}}).toArray();
    console.log("reviewData: " + reviewData);
    return reviewData;
  },
};

module.exports = exportedMethods;
