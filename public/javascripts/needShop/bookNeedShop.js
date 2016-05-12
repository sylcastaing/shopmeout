app.controller("BookNeedShopCtrl", function($scope, $http, $timeout) {

	$scope.sendPropositionSuccess = false;

	$scope.sendPropositionShop = function(demande) {
		console.log(demande);
		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/add-shoppeur',
			data: {
				idDemande: demande._id,
				mailShoppeur: $scope.userConnected.email
			}
		}).success(function (data) {
			if (data.err == null) {
				$scope.sendPropositionSuccess = true;
			}
		});
	}
});