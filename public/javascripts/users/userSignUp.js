app.controller("SignUpCtrl", function($scope, $http) {

	$(".angular-content").show();

	$scope.removeError = function() {
		if($scope.signup.$error.sexeError) {
			$scope.signup.$error.sexeError = false;
		}
	}

	$scope.addClient = function() {

		if($scope.myModel == undefined) {
			$scope.signup.$error.sexeError = true;
		}
		else {
			$scope.signup.$error.sexeError = false;
			$scope.signup.$invalid = false;

			$scope.user.motDePasse = CryptoJS.SHA1($scope.motDePasse).toString();
			$scope.user.sexe = $scope.myModel['sexe'];
			var res = $http({
				method : 'POST',
				url : '/ws-users/sign-up',
				data : $scope.user
			}).success(function (data, status, headers, config){
				if(data.statut) {
					var autoCo = $http({
						method : 'POST',
						url : '/ws-users/sign-in',
						data : { "email" : $scope.user.email, "motDePasse" : $scope.user.motDePasse }
					}).success(function (data, status, headers, config){
						document.location.reload();
					}).error(function (data, status, headers, config){
					});
				}
				else {
					$scope.signup.$signUpError = true;
					$scope.signup.$signUpErrorMsg = data.err;
				}
			}).error(function (data, status, headers, config){
				$scope.signup.$signUpError = true;
				$scope.signup.$signUpErrorMsg = data.err;
			});
		}
	}

	$scope.checkEmail = function() {
		if($scope.signup.email != undefined) {
			var res = $http({
				method : 'POST',
				url : '/ws-users/check-email',
				data : { "email" : $scope.user.email}
			}).success(function (data, status, headers, config){
				if(data.statut==false && data.erreur!="E-mail vide à la récupération.") {
					$scope.signup.email.$invalid = true;
					$scope.signup.email.$error.emailPrise = true;
					$scope.signup.email.$error.emailPriseMessage = data.err;
				}
				else {
					$scope.signup.email.$error.emailPrise = false;
				}
			}).error(function (data, status, headers, config){
			});
		}
	}

 	$scope.checkEmail = function() {
 		if($scope.signup.email.modelValue != undefined) {
 			var res = $http({
 				method : 'POST',
 				url : '/ws-users/check-email',
 				data : { "email" : $scope.user.email}
 			}).success(function (data, status, headers, config){
 				if(data.statut==false && data.erreur!="E-mail vide à la récupération.") {
 					$scope.signup.email.$invalid = true;
 					$scope.signup.email.$error.emailPrise = true;
 					$scope.signup.email.$error.emailPriseMessage = data.err;
 				}
 				else {
 					$scope.signup.email.$error.emailPrise = false;
 				}
 			}).error(function (data, status, headers, config){
 			});
 		}
 	}
 	$scope.checkEmail = function() {
 		if($scope.signup.email != undefined) {
 			var res = $http({
 				method : 'POST',
 				url : '/ws-users/check-email',
 				data : { "email" : $scope.user.email}
 			}).success(function (data, status, headers, config){
 				if(data.statut==false && data.erreur!="E-mail vide à la récupération.") {
 					$scope.signup.email.$invalid = true;
 					$scope.signup.email.$error.emailPrise = true;
 					$scope.signup.email.$error.emailPriseMessage = data.err;
 				}
 				else {
 					$scope.signup.email.$error.emailPrise = false;
 				}
 			}).error(function (data, status, headers, config){
 			});
 		}
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