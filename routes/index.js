const barkRoutes = require('./barkRoutes');

const constructor = (app) => {
  app.use('/', barkRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructor;