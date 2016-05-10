var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.get('/sign-out', function(req, res, next) {
	req.session.destroy();
	res.redirect(req.header('Referer') || '/');
});

router.get('/my-account', function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/');
	} else {
		res.render('users/myAccount/indexAccount', {title: 'Mon Compte'});
	}
});

module.exports = router;
