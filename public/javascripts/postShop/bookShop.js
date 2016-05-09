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

	$scope.getNbArticles = function(idNbArticle) {
		var res = "";
		if (idNbArticle == 0) {
			res = "Moins de 5";
		} else if (idNbArticle == 1) {
			res = "Jusqu'à 10";
		} else if (idNbArticle == 2) {
			res = "Plus de 10";
		}
		return res;
	};

});