var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.get('/', function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/users/consult-profile');
	}
	else {
		res.render('users/signIn', { title: 'Connexion' });
	}
});

router.get('/sign-up', function(req, res, next) {
	res.render('users/signUp', { title: 'Inscription utilisateur' });
});

router.get('/consult-profile', function(req, res, next) {
	res.render('users/consultProfile', { title: 'Consultation du profil' });
});

module.exports = router;
