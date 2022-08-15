const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const data = require("../data");
const salt = 8;

const users = data.users;

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
  const newOwner = await users.addOwner(
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

router.get("/registerSitter", async (req, res) => {
  res.render("partials/sitterReg", {});
});

router.post("/registerSitter", async (req, res) => {
  const { user_name, first_name, last_name, email, password } = req.body;

  const hash = await bcrypt.hash(password, salt);
  const newSitter = await users.addSitter(
    first_name,
    last_name,
    email,
    user_name,
    hash
  );
  req.session.user = newSitter;
  return res.redirect("/"); // Should redirect to either home page or straight to their dashboard after registration
});

router.get("/searchSitter", async (req, res) => {
  const userData = await users.getAllUsers();
  req.body = userData; 
  res.render("partials/searchSitter", {});
});

module.exports = router;
