const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
	defaultLayout: 'main',
	// Specify helpers which are only registered on this instance.
	helpers: {
		asJSON: (obj, spacing) => {
			if (typeof spacing === 'number')
				return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

			return new Handlebars.SafeString(JSON.stringify(obj));
		},
	},
	partialsDir: ['views/partials/'],
});

app.use('/public', static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
app.use(
	session({
		name: 'AuthCookie',
		secret: 'some secret string!',
		resave: false,
		saveUninitialized: true,
	})
);
// Trying to access a dashboard without being logged in should throw an error
app.use('/dashboards', async (req, res, next) => {
	if (!req.session.user) {
		return res.redirect('/signin', {
			error: 'You must be signed in to access your dashboard',
			title: 'Sign in',
		});
	}
	next();
});

configRoutes(app);

app.listen(3000, () => {
	console.log('Server is up and running.');
});
