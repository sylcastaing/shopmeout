app.controller("SearchPostShopCtrl", function($scope, $http) {

	$scope.mapSearch = shopMap.init({
		mapId : "mapSearchPostShop"
	});


	$scope.searchMapPostShop = function() {
		$scope.mapSearch.init({
			mapId : "mapSearchPostShop",
			adresse: $scope.adresseField,
			distance: 2000
		});
		$("#mapSearchPostShop").show();
		$("#buttonValid").show();
	}

	$scope.magasinChoisi = function() {
		if($scope.mapSearch.selectedMarker!=null) {
			$scope.selectedMagasin = $scope.mapSearch.selectedMarker.title;
			$scope.adresseSelectedMagasin = $scope.mapSearch.selectedMarker.adresse;
			$scope.postshop.$error.magasinSelected = true;
			$("#mapSearchPostShop").hide();
			$("#buttonValid").hide();
		}
	}


	// On récupère l'adresse
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.adresseField = data.user.adresse +" "+ data.user.codePostal +" "+data.user.ville;
			//$scope.searchMapPostShop();
		}
		else {
			$scope.adresseField = "";
		}
	});


	$scope.searchPostShop = function() {

			var critereProp = [{
				"magasin": $scope.selectedMagasin,
				"date": $scope.date,
				"nbArticle": $scope.nbArticle
			}];

			var res = $http({
				method : 'POST',
				url : '/ws-post-shop/search-postShop',
				data : critereProp
			}).success(function (data, status, headers, config) {
				//if(data.postShops.length>0) {

					$scope.resultRecherche = data.postShops;
				/*}
				else {
					$scope.resultRecherche = "Il n'y a pas de résultats, désolé"
				}*/
			});
	}

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

})
.directive('buttonsRadio', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, element, attr, ctrl) {
			element.bind('click', function() {
				$scope.$apply(function(scope) {
					console.log(attr.value);
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