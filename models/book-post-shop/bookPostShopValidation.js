var express = require('express');
var bookPostShopAccessDb = require('./bookPostShopAccessDb');
var bookPostShopMessages = require('properties-reader')('messages/bookPostShop.messages.properties');

var bookPostShopValidation = {

	verifDatas: function (datas, callback) {

		var err = "";
		isValid=true;
		if (isValid && (datas.mailBookeur == undefined || datas.mailBookeur == "")) {
					err = bookPostShopMessages.get("bookPostShop.creation.mailBookeur.empty");
					isValid = false;
		}
		if (isValid && (datas.prenomBookeur == undefined || datas.prenomBookeur == "")) {
					err = bookPostShopMessages.get("bookPostShop.creation.prenomBookeur.empty");
					isValid = false;
		}
		if (isValid && (datas.nomBookeur == undefined || datas.nomBookeur == "")) {
					err = bookPostShopMessages.get("bookPostShop.creation.nomBookeur.empty");
					isValid = false;
		}
		if(isValid && (datas.nbrArticleTotal == undefined || datas.nbrArticleTotal <= 0)) {
			err = bookPostShopMessages.get("bookPostShop.creation.nbrArticleTotal.notValid");
			isValid = false;
		}
		if(isValid && (datas.adresseLivraisonBookeur == undefined || datas.adresseLivraisonBookeur == "")) {
			err = bookPostShopMessages.get("bookPostShop.creation.adresseLivraisonBookeur.empty");
			isValid = false;
		}
		if(isValid && (datas.idPostShop == undefined || datas.idPostShop == "")) {
			err = bookPostShopMessages.get("bookPostShop.creation.idPostShop.empty");
			isValid = false;
		}
		if(isValid && datas.articles.length == 0) {
			err = needShopMessages.get("bookPostShop.creation.articles.notValid");
			isValid = false;
		}
		if(isValid && (datas.statut == undefined || datas.statut == "")) {
			err = bookPostShopMessages.get("bookPostShop.creation.statut.empty");
			isValid = false;
		}
		callback(isValid, err);
	}
}

module.exports = bookPostShopValidation;