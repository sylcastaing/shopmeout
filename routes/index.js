var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Shop Me Out' });
});

router.get('/mentions-legales', function(req, res, next) {
	res.render('mentionslegales', { title: 'Mentions Légales' });
});

module.exports = router;
