const usersRoutes = require('./users');
const availSitters = require('./availableSitters');
const ownerReviewRoutes = require('./ownerReview');
const dashboardRoutes = require('./dashboards');
const owners = require('./ownerProfiles');
const dogRoutes = require('./dogs');
const requestRoutes = require('./requests');
const reviewRoutes = require('./review');

const constructor = (app) => {
	app.use('/', usersRoutes);
	app.use('/sitters', availSitters);
	app.use('/ownerReview', ownerReviewRoutes);
	app.use('/owners', owners);
	app.use('/dashboards', dashboardRoutes);
	app.use('/dogs', dogRoutes);
	app.use('/requests', requestRoutes);
	app.use('/review', reviewRoutes);

	app.use('*', (req, res) => {
		res.sendStatus(404).json({ error: 'Not found' });
	});
};

module.exports = constructor;
