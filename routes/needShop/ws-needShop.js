var express = require('express');
var router = express.Router();
var passport = require('passport');
var needShopAccessDb = require('../../models/need-shop/needShopAccessDb');
var needShopValidation = require('../../models/need-shop/needShopValidation');
var needShopMessages = require('properties-reader')('messages/needShop.messages.properties');
 


router.post('/needShop', function(req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.prenom) {
			req.body.mailShoppeur = req.session.passport.user.email;
		}
	}
	// Vérification des données
	needShopValidation.verifDatas(req.body, function (isValid, err) {
		console.log(req.body);
		if (isValid) {
			// Création de la proposition
			needShopAccessDb.createNeedShop(req.body, function(result, err) {
				res.json({
					statut: result,
					err: (result)?(needShopMessages.get("needShop.creation.success")):err
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



module.exports = router;
