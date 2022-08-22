const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require('../data');

const salt = 8;

const users = data.users;

router.get('/', async (req, res) => {
  // Just for testing purposes
  return res.render('partials/userChoice', {});
});

router.get('/About', async (req, res) => {
  return res.render('partials/about', {});
});

router.get('/signin', async (req, res) => {
  return res.render('partials/signin', {});
});

router.post('/signin', async (req, res) => {
  const username = req.body.user_name.trim();
  const password = req.body.password;
  let currentUser;
  const allUsers = await users.getAllUsers();
  console.log(allUsers);

  for (i = 0; i < allUsers.length; i++) {
    if (allUsers[i].userName == username) {
      currentUser = allUsers[i];
    }
    // Need to throw an error here to inform them there is no user name that matches
    if (!currentUser) {
      console.log('No match');
      return res.redirect('/');
    }
  }

  let passwordCheck = await bcrypt.compare(password, currentUser.password);
  console.log(passwordCheck);
  // Passwords match set the current user to session and send them to their dashboard
  if (passwordCheck) {
    req.session.user = currentUser;
    console.log(req.session.user);
    console.log('session');
    return res.redirect('/success');
  }
});

router.get('/registerOwner', async (req, res) => {
  return res.render('partials/ownerReg', {});
});

router.post('/registerOwner', async (req, res) => {
  // Not sure if we should keep it this way so we can xss easily over each var or do it like registerSitter

  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const userName = req.body.user_name;
  const password = req.body.password;
  try {
    const hash = await bcrypt.hash(password, salt);
    const newOwner = await users.addOwner(firstName, lastName, email, userName, hash);

    req.session.user = newOwner;
    console.log(req.session.userId);
  } catch (error) {
    return res.status(401).render('partials/sitterReg', { errors: error });
  }

  return res.redirect('/'); // Should redirect to either home page or straight to their dashboard after registration
});

router.get('/registerSitter', async (req, res) => {
  res.render('partials/sitterReg', {});
});

router.post('/registerSitter', async (req, res) => {
  const { user_name, first_name, last_name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, salt);
    const newSitter = await users.addSitter(first_name, last_name, email, user_name, hash);
    req.session.user = newSitter;
  } catch (error) {
    return res.status(401).render('partials/sitterReg', { errors: error });
  }

  return res.redirect('/'); // Should redirect to either home page or straight to their dashboard after registration
});

router.get('/searchSitter/:id', async (req, res) => {
  const sitterData = await users.getSitter(req.params.id);
  res.render('partials/sitterProfile', { sitter: sitterData });
});

router.get('/searchSitter/', async (req, res) => {
  return res.render('partials/sitterList', {});
});
router.post('/searchSitter', async (req, res) => {
  try {
    // REGEX to get rid of whitespace between first and last name in search
    const searchTermFull = req.body.search_term.toLowerCase().replace(/\s/g, '');

    const searchTerm = req.body.search_term.toLowerCase();


    console.log(searchTerm);
    const sitterList = await users.getAllSitters();
    let currentUser;
    for (i = 0; i < sitterList.length; i++) {
      if (sitterList[i].firstName.toLowerCase() === searchTerm) {
        currentUser = sitterList[i];
      }
    }
    for (i = 0; i < sitterList.length; i++) {
      if (
        sitterList[i].firstName.toLowerCase() + sitterList[i].lastName.toLowerCase() ===
        searchTermFull
      ) {
        currentUser = sitterList[i];
      }
    }
    //Added some logic to search partials in search bar
    for (i = 0; i < sitterList.length; i++) {
      if (sitterList[i].firstName.toLowerCase().includes(searchTerm) || sitterList[i].lastName.toLowerCase().includes(searchTerm)) {
        currentUser = sitterList[i];
      }
      if (sitterList[i].firstName.toLowerCase().includes(searchTerm) && sitterList[i].lastName.toLowerCase().includes(searchTerm))
        currentUser = sitterList[i];
    }

    if (!currentUser) {
      return res.render('partials/sitterList', { errors: 'No sitter matched that name.' });
    }
    console.log(currentUser);
    return res.render('partials/sitterList', { data: currentUser });
  } catch (error) {
    return res.render('/partials/sitterList', { errors: error });
  }
});

router.get('/searchOwner/:id', async (req, res) => {
  const ownerData = await users.getOwner(req.params.id);
  res.render('partials/ownerProfile', { owner: ownerData });
});

module.exports = router;
