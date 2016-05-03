app.controller("SearchNeedShopCtrl", function($scope, $http) {

	$scope.mapSearchNeedShop = shopMap.init({
		mapId : "mapSearchNeedShop"
	});

	// Initialise la map en fonction de l'adresse choisie
	$scope.searchMapNeedShop = function() {
		$scope.mapSearchNeedShop.init({
			mapId : "mapSearchNeedShop",
			adresse: $scope.adresseField,
			distance: 2000
		});
	}

	$scope.magasinChoisi = function() {
		if($scope.mapSearchNeedShop.selectedMarker!=null) {
			$scope.selectedMagasin = $scope.mapSearchNeedShop.selectedMarker.title;
			$scope.adresseSelectedMagasin = $scope.mapSearchNeedShop.selectedMarker.adresse;
			$scope.needShop.$error.magasinSelected = true;
			$("#mapSearchNeedShop").hide();
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
		}
		else {
			$scope.adresseField = "";
		}
	});


	$scope.searchNeedShop = function() {
		var critereProp = [{
			"magasin": $scope.selectedMagasin,
			"date": $scope.date,
			"nbArticle": $scope.nbArticle
		}];

		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/search-needShop',
			data : critereProp
		}).success(function (data, status, headers, config) {
				$scope.resultRecherche = data.postShops;
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