app.controller("SignInCtrl", function($scope, $http) {

	$(".angular-content").show();

	$scope.openSignUp = function() {
		
		$("#signInModal").modal('toggle');
		$("#signUpModal").modal('show');
	}

	// fonction permettant de connecter l'utilisateur
	$scope.connectClient = function() {
		$scope.user.motDePasse = CryptoJS.SHA1($scope.motDePasse).toString();
		$scope.dataLoading = true;
		var res = $http({
			method : 'POST',
			url : '/ws-users/sign-in',
			data : $scope.user
		}).success(function (data, status, headers, config) {
			if(data.statut==false) {
				$scope.signin.$error.login = true;
				$scope.signin.$error.message = data.err.message;
				$scope.dataLoading = false;
			}
			else {
				 document.location.reload();
			}
		}).error(function (data, status, headers, config) {
			$scope.signin.$error.login = true;
			$scope.signin.$error.message = "Problème serveur";
			$scope.dataLoading = false;
		});
	}
})