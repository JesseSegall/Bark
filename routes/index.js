const usersRoutes = require("./users");

const constructor = (app) => {
  app.use("/", usersRoutes);
  // res.redirect("/");

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructor;
