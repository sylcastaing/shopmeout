app.controller("ConsultProfileCtrl", function($scope, $http) {
	var res = $http({
			method : 'GET',
			url : '/ws-users/consult-profile'
		}).success(function (data, status, headers, config){
			if(data.user != null) {
				$scope.user = data.user;
				$scope.user.sexe = ($scope.user.sexe == "0")?"Femme":"Homme";
				$(".angular-content").show();
			}
			else {
				 document.location = '/users';
			}
		}).error(function (data, status, headers, config){
			$scope.signin.$error.login = true;
			$scope.signin.$error.message = "Problème serveur";
			$scope.dataLoading = false;
		});

});