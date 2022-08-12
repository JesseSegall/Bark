const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const data = require("../data");
const salt = 16;
const ownerData = data.owners;
const sittersData = data.sitters;

router.post("/registerOwner", async (req, res) => {
  const { user_name, first_name, last_name, password, password_confm } =
    req.body;

  try {
    if (!user_name) {
      throw `Please enter a Username.`;
    }
    if (!first_name) {
      throw `Please enter your First Name.`;
    }
    if (!last_name) {
      throw `Please enter your Last Name.`;
    }
    if (!password) {
      throw `Please enter a password.`;
    }
    if (!password_confm) {
      throw `Please confirm your password.`;
    }

    if (password !== password_confm) {
      throw `Passwords do not match, please try again.`;
    }
    const hash = await bcrypt.hash(password, salt);
    const newOwner = await ownerData.addOwner(first_name);
  } catch (e) {
    return res.status(404).render(); // TODO: Need to add our homepage to render if error
  }
});

module.exports = router;
