var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersAccessDb = require('../../models/users/usersAccessDb');
var usersValidation = require('../../models/users/usersValidation');
var usersMessages = require('properties-reader')('messages/users.messages.properties');

router.post('/sign-in', function (req, res, next) {
	usersConnect(req,res,next, function(statut, err) {
		res.json({
			statut: statut,
			err: err
		});
	});
});

router.post('/sign-up', function (req, res, next) {
	// Vérification des données
	usersValidation.verifDatas(req.body, function (isValid, err) {
		if (isValid) {
			// Création de l'utilisateur
			usersAccessDb.createUser(req.body, function(result, err) {
				res.json({
					statut: result,
					err: (result)?(usersMessages.get("users.creation.success")):err
				});
				
			});
		} else {
			res.json({
				statut: false,
				err : err
			});
		}
	});

});


router.get('/consult-profile', function (req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.email) {
			usersAccessDb.getUser(req.session.passport.user.email, function(user, err) {
				res.json({
					user : user,
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


router.post('/sign-out', function(req, res, next) {
	req.session.destroy();
	res.json({
		statut: req.isAuthenticated()
	});
});

router.post('/check-email', function (req, res, next) {
	// Vérification des données

	usersValidation.verifEmail(req.body, function(result, err) {
		res.json({
			statut: result,
			err: err
		});
	});
});

usersConnect = function(req, res, next, callback) {
	if (req.isAuthenticated()) {
		callback(false, usersMessages.get('users.connection.alreadyconnect'));
	}
	passport.authenticate('local', {
		session: true
	}, function(err, user, info) {
		if (err) {
			callback(false, info);
		}
		if (!user) {
			callback(false, info);
		}
		else {
			return req.login(user, function(err) {
				if (err) {
					callback(false, err);
				} else {
					callback(true, "");
				}
			});
		}
	})
	(req, res, next);
}

	module.exports = router;
