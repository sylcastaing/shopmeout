 var app = angular.module('sample', []);

 app.controller("SignCtrl", function($scope, $http) {

 	$scope.addClient = function() {

 		$scope.user.motDePasse = CryptoJS.SHA1($scope.motDePasse).toString();
 		$scope.user.sexe = $scope.myModel['sexe'];
 		var res = $http({
 			method : 'POST',
 			url : '/ws-users/sign-up',
 			data : $scope.user
 		}).success(function (data, status, headers, config){
 			console.log(data);
 			if(data.status) {
 				document.location="/";
 			}
 			else {
 				$scope.signup.$signUpError = true;
 				$scope.signup.$signUpErrorMsg = data.erreur;
 			}
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
 				console.log(data);
 				$scope.signup.email.$error.emailPrise = true;
 				$scope.signup.email.$error.emailPriseMessage = data.erreur;
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
 }).directive('buttonsRadio', function() {
 	return {
 		restrict: 'A',
 		require: 'ngModel',
 		link: function($scope, element, attr, ctrl) {
 			element.bind('click', function() {
 				$scope.$apply(function(scope) {
 					ctrl.$setViewValue(attr.value);
 				});
 			});

 			$scope.$watch(attr.ngModel, function(newValue, oldValue) {
 				element.parent(".btn-group").find('button').removeClass("active");
				element.parent(".btn-group") //.children()
				.find("button[value='" + newValue + "']").addClass('active');
			});
 		}
 	};
 });