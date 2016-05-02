var express = require('express');
var postShopAccessDb = require('../../models/post-shop/postShopAccessDb');
var postShopMessages = require('properties-reader')('messages/postShop.messages.properties');


var postShopValidation = {

	verifDatas: function (datas, callback) {

		var valideCP = /^[0-9]{5}$/;
		var err = "";
		isValid=true;
		if (isValid && (datas.mailShoppeur == undefined || datas.mailShoppeur == "")) {
					err = postShopMessages.get("postShop.creation.nomShoppeur.empty");
					isValid = false;
		}
		if (isValid && (datas.date == undefined || datas.date == "")) {
					err = postShopMessages.get("postShop.creation.date.empty");
					isValid = false;
		}
		if(isValid && (datas.codePostal == undefined || datas.codePostal == "")) {
			err = postShopMessages.get("postShop.creation.codePostal.empty");
			isValid = false;
		}
		if (isValid && (datas.magasin == undefined || datas.magasin == "")) {
			err = postShopMessages.get("postShop.creation.magasin.empty");
			isValid = false;
		}
		// TODO : Vérifier que le magasin est bien présent dans l'API
		if(isValid && datas.distance > 3) {
			err = postShopMessages.get("postShop.creation.distance.notValid");
			isValid = false;
		}
		if(isValid && (datas.nbShoppeur == 0 || datas.nbShoppeur > 4)) {
			err = postShopMessages.get("postShop.creation.nbShoppeur.notValid");
			isValid = false;
		}
		if(isValid && datas.nbArticle > 3) {
			err = postShopMessages.get("postShop.creation.nbArticle.notValid");
			isValid = false;
		}
		callback(isValid, err);
	}
}

module.exports = postShopValidation;