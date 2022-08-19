const usersRoutes = require("./users");
const availSitters = require("./availableSitters");
const ownerReviewRoutes = require("./ownerReview");

const constructor = (app) => {
	app.use("/", usersRoutes);
	app.use("/sitters", availSitters);
	app.use("/ownerReview", ownerReviewRoutes);

	app.use("*", (req, res) => {
		res.sendStatus(404).json({ error: "Not found" });
	});
};

module.exports = constructor;
