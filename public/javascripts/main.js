/** Fichier contenant l'ensemble des méthodes génériques
 ** Pour tous les clients (inclus dans layout.jade)
 **/

var app = angular.module('ShopMeOut', []);

app.filter('firstLetter', function() {
	return function(input) {
		return input.substr(0,1);
	};
});