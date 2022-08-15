const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const data = require("../data");
const salt = 8;
const ownerData = data.owners;
const sitterData = data.sitters;

router.get("/", async (req, res) => {
  // Just for testing purposes
  res.render("partials/userChoice", {});
});

router.get("/registerOwner", async (req, res) => {
  res.render("partials/ownerReg", {});
});

router.post("/registerOwner", async (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const userName = req.body.user_name;
  const password = req.body.password;

  const hash = await bcrypt.hash(password, salt);
  const newOwner = await ownerData.addOwner(
    firstName,
    lastName,
    email,
    userName,
    hash
  );

  req.session.user = newOwner;
  console.log(req.session.userId);
  return res.redirect("/"); // Should redirect to either home page or straight to their dashboard after registration
});

router.post("/registerSitter", async (req, res) => {
  const { user_name, first_name, last_name, email, password, password_confm } =
    req.body;

  const hash = await bcrypt.hash(password, salt);
  const newSitter = await sitterData.addSitter(
    first_name,
    last_name,
    email,
    user_name,
    hash
  );
  req.session.userId = newSitter._id.toHexString();
  return res.resdirect("/dashboard"); // Should redirect to either home page or straight to their dashboard after registration
});

//teseting this one
router.get('/searchSitter', (req, res) => { 
  const listOfSitters = sitterData.getAll(); 
  let names = req.body.firstName + " " + req.body.lastName;
  var sitterList = names; 
  return sitterList;
  res.render("partials/searchSitter", {});
}); 

module.exports = router;
