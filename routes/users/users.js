var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.get('/', function(req, res, next) {
	res.render('users/signIn', { title: 'Connexion' });
});

router.get('/sign-up', function(req, res, next) {
	res.render('users/signUp', { title: 'Inscription utilisateur' });
});

router.post('/sign-up', function(req, res, next) {
	res.send('Post page');
});

module.exports = router;
