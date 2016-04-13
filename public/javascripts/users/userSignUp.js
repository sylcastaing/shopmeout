 var app = angular.module('sample', []);

 app.controller("SignCtrl", function($scope, $http) {
 	$scope.addClient = function() {

 		$scope.user.motDePasse = CryptoJS.SHA1($scope.motDePasse).toString();
 		
 		var res = $http({
 			method : 'POST',
 			url : '/ws-users/sign-up',
 			data : $scope.user
 		}).success(function (data, status, headers, config){
			console.log("succes");
			console.log(data);
 		}).error(function (data, status, headers, config){
 			console.log("echec");
 		});
 		console.log($scope.user);
 	}

 	$scope.checkEmail = function() {
 		var res = $http({
 			method : 'POST',
 			url : '/ws-users/check-email',
 			data : { "email" : $scope.user.email}
 		}).success(function (data, status, headers, config){
			if(data.statut==false && data.erreur!="E-mail vide à la récupération.") {
				$scope.signup.email.$error.emailPrise = true;
			}
			else {
				$scope.signup.email.$error.emailPrise = false;
			}
		}).error(function (data, status, headers, config){
			console.log(data);
		});
	}
})
 .directive("compareTo", function() {
 	return {
 		require: "ngModel",
 		scope: {
 			otherModelValue: "=compareTo"
 		},
 		link: function(scope, element, attributes, ngModel) {
 			ngModel.$validators.compareTo = function(modelValue) {
 				return modelValue == scope.otherModelValue;
 			};

 			scope.$watch("otherModelValue", function() {
 				ngModel.$validate();
 			});
 		}
 	};
 });
