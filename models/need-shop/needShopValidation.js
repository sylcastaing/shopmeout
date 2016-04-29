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
		if (isValid && (datas.dateShopping == undefined || datas.dateShopping == "")) {
					err = needShopMessages.get("needShop.creation.dateShopping.empty");
					isValid = false;
		}
		if(isValid && (datas.adresse == undefined || datas.adresse == "")) {
			err = needShopMessages.get("needShop.creation.adresse.empty");
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