var app = angular.module('sample', []);

app.controller("SignCtrl", function($scope, $http) {

	$scope.connectClient = function() {
		$scope.user.motDePasse = CryptoJS.SHA1($scope.motDePasse).toString();
		$scope.dataLoading = true;
		var res = $http({
			method : 'POST',
			url : '/ws-users/sign-in',
			data : $scope.user
		}).success(function (data, status, headers, config){
			if(data.statut==false) {
				$scope.signin.$error.login = true;
				$scope.signin.$error.message = data.erreur.message;
				$scope.dataLoading = false;
			}
			else {
				 document.location = '/';
			}
		}).error(function (data, status, headers, config){
			console.log("echec");
			$scope.signin.$error.login = true;
			$scope.signin.$error.message = "Problème serveur";
			$scope.dataLoading = false;
		});
		console.log($scope.user);
	}
})