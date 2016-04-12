/**
 * Déclaration de l'application demoApp
 */
var app = angular.module('sample', []);


app.controller("SignCtrl", function($scope, $http) {

	$scope.addClient = function() {
		var res = $http({
			method : 'POST',
			url : '/ws-users/sign-up',
			data : $scope.user
		})
	}

	$scope.checkEmail = function() {
		console.log($scope.user.email);
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
