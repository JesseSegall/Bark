const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

//TODO make sure logged in proper

router.get('/', (req, res) => {
	if(req.session.user){
        res.redirect(`/private`)
    }
    //TODO
	//return res.redirect(`/dash`)
});

/*
router.get('/:id', (req,res) => {
    if (req.session.user){
        res.redirect(`/private`);
    }
    else{
        if (res.id){
            let obsv_user = users.getOwner(res.id);
        }
        
    }
})
*/

router.get(`/private`, (req, res) => {
    if (req.session.user){
        res.render(`../views/partials/userdash`, req.session.user)
    }
  
})