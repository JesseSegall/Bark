const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const data = require("../data");
const salt = 8;
const ownerData = data.owners;
const sittersData = data.sitters;

router.get("/", async (req, res) => {
  // Just for testing purposes
  res.render("partials/userChoice", {});
});

router.get("/registerOwner", async (req, res) => {
  res.render("partials/ownerReg", {});
});

router.post("/registerOwner", async (req, res) => {
  const { user_name, first_name, last_name, email, password, password_confm } =
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
    if (!email) {
      throw `Please enter your email address.`;
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
    const newOwner = await ownerData.addOwner(
      first_name,
      last_name,
      email,
      user_name,
      hash
    );
    req.session.userId = newOwner._id.toHexString();
    return res.resdirect("/dashboard"); // Should redirect to either home page or straight to their dashboard after registration
  } catch (e) {
    return res.status(404).render(); // TODO: Need to add our homepage to render if error
  }
});

module.exports = router;
