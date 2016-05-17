app.controller("BookNeedShopCtrl", function($scope, $http, $timeout) {

	$scope.sendPropositionShop = function(demande) {
		$scope.$parent.idDemandeSent = demande._id;
		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/add-shoppeur',
			data: {
				idDemande: demande._id
			}
		}).success(function(data) {
			if (data.err == null) {
				$scope.$parent.sendPropositionSuccess = true;
				demande.isAlreadyShoppeur = true;
			}
		});
	}

	$('#bookNeedShopModal').on('hidden.bs.modal', function () {
		if ($scope.sendPropositionSuccess) {
			$scope.selectedDemande.isAlreadyShoppeur = true;
			$scope.$parent.sendPropositionSuccess = false;
			$scope.$apply();
		}
	});
});