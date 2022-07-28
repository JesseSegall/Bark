const connection = require("./config/mongoConnection");
const sitters = require("./data/sitters");
let sitter1 = undefined;

async function main() {
  try {
    sitter1 = await sitters.create(
      "James",
      "Kirk",
      "jkirk@gmail.com",
      "jimmyK",
      "will be a hashed pw",
      ["ids of dogs sat"],
      "picture.jpg",
      "50$",
      "3 days"
    );
    console.log(sitter1);
  } catch (e) {
    console.log(e);
  }
  await connection.closeConnection();
  console.log("Connection has been closed.");
}
main();
