var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.get('/', function(req, res, next) {
	if (req.isAuthenticated()) {
		res.render('needShop/needShop', { title: 'Demander un Shopping' });
	} else {
		res.redirect("/users/");
	}
});

router.get('/search', function(req, res, next) {
	res.render('needShop/search-needShop', { title: 'Rechercher une proposition de shopping' });
});

module.exports = router;
