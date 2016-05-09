app.controller("SearchPostShopCtrl", function($scope, $http) {

	$scope.mapSearch = shopMap.init({
		mapId : "mapSearchPostShop"
	});

	$("#mapSearchPostShop").hide();
	$scope.showDiv = true;

	$scope.searchMapPostShop = function() {
		$scope.mapSearch.init({
			mapId : "mapSearchPostShop",
			adresse: $scope.adresseField,
			distance: 2000
		});
		$("#mapSearchPostShop").show();
		$scope.showDiv = false;
		$scope.erreurMessage = false;
	}

	$scope.magasinChoisi = function() {
		if($scope.mapSearch.selectedMarker!=null) {
			$scope.selectedMagasin = $scope.mapSearch.selectedMarker.title;
			$scope.adresseSelectedMagasin = $scope.mapSearch.selectedMarker.adresse;
			$scope.postshop.$error.magasinSelected = true;
			$("#mapSearchPostShop").hide();
			$scope.showDiv = true;
			$scope.postshop.$error.noMagasinSelected = false;
		} else {
				$scope.postshop.$error.noMagasinSelected = true;
		}
	}


	// On récupère l'adresse
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.adresseField = data.user.adresse +" "+ data.user.codePostal +" "+data.user.ville;
		}
		else {
			$scope.adresseField = "";
		}
	});


	$scope.searchPostShop = function() {
			if($scope.mapSearch.selectedMarker==null) {
				$scope.postshop.$error.noMagasinSelected = true;
			}
			else {
				$scope.postshop.$error.noMagasinSelected = false;
				var critereProp = [{
					"magasin": $scope.selectedMagasin,
					"adresse": $scope.adresseSelectedMagasin,
					"date": $scope.date,
					"nbArticle": $scope.nbArticle
				}];

				var res = $http({
					method : 'POST',
					url : '/ws-post-shop/search-postShop',
					data : critereProp
				}).success(function (data, status, headers, config) {
						$scope.erreurMessage = true;
						$scope.resultRecherche = data.postShops;
				});
			}
	}

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
})
.directive('myEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.myEnter);
				});

				event.preventDefault();
			}
		});
	};
});
