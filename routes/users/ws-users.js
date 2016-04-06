var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.get('/', function(req, res, next) {
	usersAccessDb.createUser(function(result) {
		if(result == "OKKK") {
			res.send('Création OK');
		} else {
			res.send('Création KO...');
		}
	});
});

module.exports = router;
