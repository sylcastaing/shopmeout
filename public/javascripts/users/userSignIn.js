/**
 * Déclaration de l'application demoApp
 */
var app = angular.module('sample', []);

app.controller("SignCtrl", function($scope, $http) {

	$scope.connectClient = function() {
		var res = $http({
			method : 'POST',
			url : '/ws-users/sign-in',
			data : $scope.user
		}).success(function (data, status, headers, config){
			if (status == '200') {
				console.log("succes");
				console.log(data);
			}
		}).error(function (data, status, headers, config){
			console.log("echec");
		});
		console.log($scope.user);
	}
})