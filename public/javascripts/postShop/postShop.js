app.controller("PostShopCtrl", function($scope, $http, $timeout) {

	shopMap.init();

	$scope.removeErrorDistance = function() {
		if($scope.postShop.$error.distanceError) {
			$scope.postShop.$error.distanceError = false;
		}
	}
	$scope.removeErrorNbShoppeur = function() {
		if($scope.postShop.$error.NbShoppeurError) {
			$scope.postShop.$error.NbShoppeurError = false;
		}
	}
	$scope.removeErrorNbArticle = function() {
		if($scope.postShop.$error.NbArticleError) {
			$scope.postShop.$error.NbArticleError = false;
		}
	}

	$scope.addPostShop = function() {
		var isOK = true;
		if($scope == undefined || $scope.data.distance == undefined) {
			$scope.postShop.$error.distanceError = true;
			isOK = false;
		}
		if($scope == undefined || $scope.data.nbShoppeur == undefined) {
			$scope.postShop.$error.NbShoppeurError = true;
			isOK = false;
		}
		if($scope == undefined || $scope.data.nbArticle == undefined) {
			$scope.postShop.$error.NbArticleError = true;
			isOK = false;
		}
		if($scope.data.date == undefined) {
			$scope.postShop.$error.date = true;
			isOK = false;
		} 
		if(isOK) {
			$scope.postShop.$error.date = false;
			$scope.postShop.$error.distanceError = false;
			$scope.postShop.$error.NbShoppeurError = false;
			$scope.postShop.$error.NbArticleError = false;
			$scope.data.magasin = $scope.selectedMagasin;
			$scope.data.adresse = $scope.adresseSelectedMagasin;
			var res = $http({
				method : 'POST',
				url : '/ws-post-shop/postShop',
				data : $scope.data
			}).success(function (data, status, headers, config){
				if(data.statut==false) {
					$scope.postShop.$error.addPostShop = true;
					$scope.postShop.$error.message = data.err;
				} else {
					$scope.postShop.$error.validate = true;
					$timeout(function() {
						$scope.postShop.$error.validate = false;
					}, 3000);
					$scope.data = angular.copy();
				}
			}).error(function (data, status, headers, config){
				$scope.postShop.$error.addPostShop = true;
				$scope.postShop.$error.message = "Problème serveur";
			});
		}
	}

	$scope.search = function() {
		shopMap.init({
			adresse: $scope.data.adresse,
			distance: 2000
		});
		$scope.postShop.selectMagasin = true;

	}

	/*var marker = shopMap.selectedMarker;

	marker.addListener('click', function() {
		$scope.postShop.selectedMagasin = true;
		$scope.data.magasin = shopMap.selectedMarker.title;
	});*/


})
.directive('buttonsRadio', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, element, attr, ctrl) {
			element.bind('click', function() {
				$scope.$apply(function(scope) {
					ctrl.$setViewValue(attr.value);
				});
			});

			$scope.$watch(attr.ngModel, function(newValue, oldValue) {
				element.parent(".btn-group").find('button').removeClass("active");
					element.parent(".btn-group") //.children()
					.find("button[value='" + newValue + "']").addClass('active');
				});
		}
	};
});