var app = angular.module('sample', []);

app.controller("SignCtrl", function($scope, $http) {

	$scope.connectClient = function() {
		$scope.user.motDePasse = CryptoJS.SHA1($scope.motDePasse).toString();
		var res = $http({
			method : 'POST',
			url : '/ws-users/sign-in',
			data : $scope.user
		}).success(function (data, status, headers, config){
			if(data.statut==false) {
				$scope.signin.$error.login = true;
				$scope.signin.$error.message = data.erreur.message;
			}
			else {
				 document.location = '/';
			}

			 {
				console.log("succes");
				console.log(data);
			}
		}).error(function (data, status, headers, config){
			console.log("echec");
		});
		console.log($scope.user);
	}
})