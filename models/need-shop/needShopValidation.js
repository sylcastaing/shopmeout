var express = require('express');
var needShopAccessDb = require('../../models/need-shop/needShopAccessDb');
var needShopMessages = require('properties-reader')('messages/needShop.messages.properties');


var needShopValidation = {

	verifDatas: function (datas, callback) {

		var valideCP = /^[0-9]{5}$/;
		var err = "";
		isValid=true;
		if (isValid && (datas.mailShoppeur == undefined || datas.mailShoppeur == "")) {
					err = needShopMessages.get("needShop.creation.mailShoppeur.empty");
					isValid = false;
		}
		if (isValid && (datas.date == undefined || datas.date == "")) {
					err = needShopMessages.get("needShop.creation.date.empty");
					isValid = false;
		}
		if(isValid && (datas.codePostal == undefined || datas.codePostal == "")) {
			err = needShopMessages.get("needShop.creation.codePostal.empty");
			isValid = false;
		}
		else if (isValid && (datas.codePostal.length != 5 || !valideCP.test(datas.codePostal))) {
			err = needShopMessages.get("needShop.creation.codePostal.notValid");
			isValid = false;
		}
		if(isValid && datas.nbArticle > 3) {
			err = needShopMessages.get("needShop.creation.nbArticle.notValid");
			isValid = false;
		}
		callback(isValid, err);
	}
}

module.exports = needShopValidation;