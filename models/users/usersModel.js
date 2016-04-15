var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersModel = new Schema({
	email: String,
	nom: String,
	prenom: String,
	dateNaissance: String,
	adresse: String,
	codePostal: String,
	ville: String,
	telephone: String,
	sexe: String,
	motDePasse: String,
	dateInscription: Date
});

module.exports = mongoose.model('users', usersModel);