/**
 * Déclaration de l'application demoApp
 */
var app = angular.module('sample', []);


app.controller("SignCtrl", function($scope, $http) {

	$scope.addClient = function(user) {
		var res = $http({
			method : 'POST',
			url : '/ws-users/sign-up',
			data : user
		})
		
	}
});
