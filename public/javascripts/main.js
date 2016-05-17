/** Fichier contenant l'ensemble des méthodes génériques
 ** Pour tous les clients (inclus dans layout.jade)
 **/

var app = angular.module('ShopMeOut', []);

app.filter('firstLetter', function() {
	return function(input) {
		if (input) {
			return input.substr(0,1);
		} else {
			return "";
		}
	};

});

app.filter('nbArticleLabel', function() {
	return function(idNbArticle) {
		var res = "";
		if (idNbArticle == 0) {
			res = "Moins de 5";
		} else if (idNbArticle == 1) {
			res = "Jusqu'à 10";
		} else if (idNbArticle == 2) {
			res = "Plus de 10";
		}
		return res;
	};
});

app.controller("MainCtrl", function($scope, $http, $timeout) {
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.userConnected = data.user;
		}
		else {
			$scope.userConnected = null;
		}
	});
})