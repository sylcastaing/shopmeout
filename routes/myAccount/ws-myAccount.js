var express = require('express');
var router = express.Router();
var passport = require('passport');
var postShopAccessDb = require('../../models/post-shop/postShopAccessDb');
var needShopAccessDb = require('../../models/need-shop/needShopAccessDb');
var bookPostShopAccessDb = require('../../models/book-post-shop/bookPostShopAccessDb');
var usersMessages = require('properties-reader')('messages/users.messages.properties');



router.get('/consult-postShops', function (req, res, next) {
	if (req.isAuthenticated() && req.session.passport.user.email) {
		postShopAccessDb.getPostShops(req.session.passport.user.email, function(postShop, err) {
			res.json({
				postShops : postShop,
				err : err
			});
		});
	}
	else {
		res.json({
			postShops : null,
			err : usersMessages.get("users.consult.notConnected")
		});
	}
});


router.get('/consult-needShops', function (req, res, next) {
	if (req.isAuthenticated() && req.session.passport.user.email) {
		needShopAccessDb.getNeedShops(req.session.passport.user.email, function(needShop, err) {
			res.json({
				needShops : needShop,
				err : err
			});
		});
	} else {
		res.json({
			needShops : null,
			err : usersMessages.get("users.consult.notConnected")
		});
	}
});

/* Prend l'ID du postShop en param */
router.get('/consult-bookPostShops', function (req, res, next) {
	bookPostShopAccessDb.getBookPostShops(req.query.id, function(bookPostShops, err) {
		res.json({
			bookPostShops : bookPostShops,
			err : err
		});
	});
});

// On récupère les demandes de shopping à partir d'un mail de shoppeur
router.get('/consult-myBookNeedShops', function (req, res, next) {
	if (req.isAuthenticated() && req.session.passport.user.email) {
		needShopAccessDb.getBookNeedShops(req.session.passport.user.email, function(err, needShops) {
			res.json({
				needShops : needShops,
				err : err
			});
		});
	} else {
		res.json({
			needShops : null,
			err : usersMessages.get("users.consult.notConnected")
		});
	}
});

// On récupère les propositions de shopping que l'on a reservé
router.get('/consult-myBookPostShops', function (req, res, next) {
	if (req.isAuthenticated() && req.session.passport.user.email) {
		bookPostShopAccessDb.getMyBookPostShops(req.session.passport.user.email, function(err, postShops) {
			res.json({
				postShops : postShops,
				err : err
			});
		});
	} else {
		res.json({
			postShops : null,
			err : usersMessages.get("users.consult.notConnected")
		});
	}
});


module.exports = router;