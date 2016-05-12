var express = require('express');
var needShopAccessDb = require('../../models/need-shop/needShopAccessDb');
var needShopMessages = require('properties-reader')('messages/needShop.messages.properties');


var needShopValidation = {

	verifDatas: function (datas, callback) {

		var valideCP = /^[0-9]{5}$/;
		var err = "";
		isValid=true;
		if (isValid && (datas.mail == undefined || datas.mail == "")) {
					err = needShopMessages.get("needShop.creation.mail.empty");
					isValid = false;
		}
		if (isValid && (datas.nom == undefined || datas.nom == "")) {
					err = needShopMessages.get("needShop.creation.nom.empty");
					isValid = false;
		}
		if (isValid && (datas.prenom == undefined || datas.prenom == "")) {
					err = needShopMessages.get("needShop.creation.prenom.empty");
					isValid = false;
		}
		if (isValid && (datas.magasin == undefined)) {
					err = needShopMessages.get("needShop.creation.magasin.empty");
					isValid = false;
		}
		if (isValid && (datas.adresseMagasin == undefined)) {
					err = needShopMessages.get("needShop.creation.adresseMagasin.empty");
					isValid = false;
		}
		if (isValid && (datas.date == undefined || datas.date == "")) {
					err = needShopMessages.get("needShop.creation.date.empty");
					isValid = false;
		}
		if(isValid && (datas.adresse == undefined || datas.adresse == "")) {
			err = needShopMessages.get("needShop.creation.adresse.empty");
			isValid = false;
		}
		if(isValid && datas.nbArticle == 0) {
			err = needShopMessages.get("needShop.creation.nbArticle.notValid");
			isValid = false;
		}
		callback(isValid, err);
	}
}

module.exports = needShopValidation;