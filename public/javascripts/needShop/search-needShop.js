app.controller("SearchNeedShopCtrl", function($scope, $http) {

	$scope.mapSearchNeedShop = shopMap.init({
		mapId : "mapSearchNeedShop"
	});

	$("#mapSearchNeedShop").hide();
	$("#buttonValid").hide();

	// Initialise la map en fonction de l'adresse choisie
	$scope.searchMapNeedShop = function() {
		$scope.mapSearchNeedShop.init({
			mapId : "mapSearchNeedShop",
			adresse: $scope.adresseField,
			distance: 2000
		});
		$("#mapSearchNeedShop").show();
		$("#buttonValid").show();
		$scope.erreurMessage = false;
	}

	$scope.magasinChoisi = function() {
		if($scope.mapSearchNeedShop.selectedMarker!=null) {
			$scope.selectedMagasin = $scope.mapSearchNeedShop.selectedMarker.title;
			$scope.adresseSelectedMagasin = $scope.mapSearchNeedShop.selectedMarker.adresse;
			$scope.needShop.$error.magasinSelected = true;
			$("#mapSearchNeedShop").hide();
			$("#buttonValid").hide();
			$scope.needShop.$error.noMagasinSelected = false;
		} else {
			$scope.needShop.$error.noMagasinSelected = true;
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
			"adresseMagasin": $scope.adresseSelectedMagasin,
			"date": $scope.date,
			"nbArticle": $scope.nbArticle
		}];

		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/search-needShop',
			data : critereProp
		}).success(function (data, status, headers, config) {
				$scope.resultRecherche = data.needShops;
				$scope.erreurMessage = true;
		});
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