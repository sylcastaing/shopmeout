var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.get('/', function(req, res, next) {
	res.render('postShop/postShop', { title: 'Proposer un Shopping' });
});

module.exports = router;
