const connection = require("./config/mongoConnection");
const sitters = require("./data/sitters");
let sitter1 = undefined;
const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
// async function main() {
//   try {
//     sitter1 = await sitters.create(
//       "James",
//       "Kirk",
//       "jkirk@gmail.com",
//       "jimmyK",
//       "will be a hashed pw",
//       ["ids of dogs sat"],
//       "picture.jpg",
//       "50$",
//       "3 days"
//     );
//     console.log(sitter1);
//   } catch (e) {
//     console.log(e);
//   }
//   await connection.closeConnection();
//   console.log("Connection has been closed.");
// }

// main();
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is up and running.");
});
