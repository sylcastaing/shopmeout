var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Shop Me Out' });
});

router.get('/#/home', function(req, res, next) {
	res.render('index', { title: 'Shop Me Out' });
});

router.get('/#/proposerShopping', function(req, res, next) {
	res.render('search-postShop', { title: 'Shop Me Out' });
});

router.get('/#/demanderShopping', function(req, res, next) {
	res.render('search-postShop', { title: 'Shop Me Out' });
});

router.get('/mentions-legales', function(req, res, next) {
	res.render('mentionslegales', { title: 'Mentions Légales' });
});

router.get('/faq', function(req, res, next) {
	res.render('faq', { title: 'Comment ça marche ?' });
});

module.exports = router;
