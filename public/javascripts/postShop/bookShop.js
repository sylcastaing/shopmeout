app.controller("BookShopCtrl", function($scope, $http, $location) {
	
	$("#bookShopModal").on('shown.bs.modal', function() {
		var res = $http({
					method : 'POST',
					url : '/ws-post-shop/get-postShop',
					data : {"id" : $location.search().id }
				}).success(function (data, status, headers, config) {
						$scope.propShop = data.postShop;
						console.log(data.postShop);
				});
	});


});