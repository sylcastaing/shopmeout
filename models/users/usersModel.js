var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersModel = new Schema({
	email: String,
	nom: String,
	prenom: String,
	dateNaissance: Date,
	adresse: String,
	codePostal: String,
	ville: String,
	telephone: String,
	sexe: String,
	motDePasse: String,
	dateInscription: String
});

module.exports = mongoose.model('users', usersModel);