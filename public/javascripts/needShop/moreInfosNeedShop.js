app.controller("MoreInfosNeedShopCtrl", function($scope, $http, $timeout) {

	$scope.data={};

	$scope.acceptBooking = function(isAccepted, shoppeur) {
		$scope.data.selectedDemande = $scope.$parent.selectedDemande;
		$scope.data.isAccepted = isAccepted;
		$scope.data.shoppeur = shoppeur;

		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/accept-needShop',
			data : $scope.data
		}).success(function (data){
			if(data.update!=null) {
				shoppeur.statut = (isAccepted)?"Validé":"Refusé";
			} else {
				console.log("PAS AJOUT");
			}
		});
	}

});