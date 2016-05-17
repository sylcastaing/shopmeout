app.controller("MoreInfosPostShopCtrl", function($scope, $http, $timeout) {

	$scope.data={};

	$scope.acceptBooking = function(isAccepted, bookeur) {
		$scope.data.selectedProposition = $scope.$parent.selectedProposition;
		$scope.data.isAccepted = isAccepted;
		$scope.data.bookeur = bookeur;

		var res = $http({
			method : 'POST',
			url : '/ws-post-shop/accept-postShop',
			data : $scope.data
		}).success(function (data){
			if(data.update!=null) {
				bookeur.statut = (isAccepted)?"Validé":"Refusé";
			} else {
				console.log("PAS AJOUT");
			}
		});

	}
});