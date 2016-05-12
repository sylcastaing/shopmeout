var express = require('express');
var router = express.Router();
var passport = require('passport');
var postShopAccessDb = require('../../models/post-shop/postShopAccessDb');
var needShopAccessDb = require('../../models/need-shop/needShopAccessDb');
var bookPostShopAccessDb = require('../../models/book-post-shop/bookPostShopAccessDb');
var usersMessages = require('properties-reader')('messages/users.messages.properties');



router.get('/consult-postShops', function (req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.email) {
			postShopAccessDb.getPostShops(req.session.passport.user.email, function(postShop, err) {
				res.json({
					postShops : postShop,
					err : err
				});
			});
		}
		else {
			res.json({
				user : null,
				err : usersMessages.get("users.consult.notConnected")
			});
		}
	}
	else {
		res.json({
			user : null,
			err : usersMessages.get("users.consult.notConnected")
		});
	}
});


router.get('/consult-needShops', function (req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.email) {
			needShopAccessDb.getNeedShops(req.session.passport.user.email, function(needShop, err) {
				res.json({
					needShops : needShop,
					err : err
				});
			});
		}
		else {
			res.json({
				user : null,
				err : usersMessages.get("users.consult.notConnected")
			});
		}
	}
	else {
		res.json({
			user : null,
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


module.exports = router;