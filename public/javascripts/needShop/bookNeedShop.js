app.controller("BookNeedShopCtrl", function($scope, $http, $timeout) {

	$('#bookNeedShopModal').on('show.bs.modal', function () {
		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/is-already-add',
			data: {
				idDemande: $scope.selectedDemande._id,
				mailShoppeur: $scope.userConnected.email
			}
		}).success(function(data) {
			console.log(data.needShops);
			if (data.needShops.length > 0) {
				$scope.$parent.sendPropositionSuccess = true;
			} else {
				$scope.$parent.sendPropositionSuccess = false;
			}
		})
	});

	$scope.sendPropositionShop = function(demande) {
		$scope.$parent.idDemandeSent = demande._id;
		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/add-shoppeur',
			data: {
				idDemande: demande._id,
				mailShoppeur: $scope.userConnected.email
			}
		}).success(function(data) {
			if (data.err == null) {
				$scope.$parent.sendPropositionSuccess = true;
			}
		});
	}

	$('#bookNeedShopModal').on('hidden.bs.modal', function () {
		if ($scope.sendPropositionSuccess) {
			$scope.$parent.isSent = true;
			$scope.$apply();
		}
	});
});