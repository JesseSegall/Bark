const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const session = require("express-session");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is up and running.");
});
