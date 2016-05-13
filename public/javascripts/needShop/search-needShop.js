app.controller("SearchNeedShopCtrl", function($scope, $http) {

	$scope.mapSearchNeedShop = shopMap.init({
		mapId : "mapSearchNeedShop"
	});

	$("#mapSearchNeedShop").hide();
	$("#buttonValid").hide();

	// On récupère l'adresse et l'email de l'utilisateur
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.adresseField = data.user.adresse + " " + data.user.codePostal + " " + data.user.ville;
			$scope.email = data.user.email;
			$scope.isAuthenticated = true;
		}
		else {
			$scope.adresseField = "";
		}
	});

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
			if (data.needShops.length != 0) {
				// On calcule les distances entre le magasin et les adresses
				//console.log(data.needShops);
				var tabAdress = [];
				var tabRes = [];
				var tabAllRes = [];
				var tabDisable = [];
				for(i in data.needShops) {
					tabAdress.push(data.needShops[i].adresse);
					tabDisable[i] = false;
						if(data.needShops[i].mailShoppeur == $scope.email){
							tabDisable[i] = true;
						}
				}
				distanceManager.getDistance(tabAdress, $scope.adresseSelectedMagasin, function(distances) {
					for(i in distances) {
						data.needShops[i].distance = distances[i];
						if(($scope.distance == 0 && distances[i] < 1000) 
							|| ($scope.distance == 1 && distances[i] < 5000)
							|| ($scope.distance == 2 && distances[i] < 10000)
							|| ($scope.distance == 3)){
							tabRes.push({"need" : data.needShops[i], "var" : tabDisable[i]});
						}
					}
					if($scope.distance == undefined) {
						for(i in data.needShops) {
							tabAllRes.push({"need" : data.needShops[i], "var" : tabDisable[i]});
						}
						$scope.resultRecherche = tabAllRes;
						$scope.erreurMessage = true;
						$scope.$apply();
					} else {
						$scope.resultRecherche = tabRes;
						$scope.erreurMessage = true;
						$scope.$apply();
					}
				});
				$scope.nbLignesResultRecherche = data.needShops.length % 2;
			} else {
				$scope.resultRecherche = data.needShops;
				$scope.erreurMessage = true;
			}
		});
	}

	$scope.openListArticles = function(demande) {
		$scope.selectedDemande = demande;
		$("#listArticlesModal").modal('show');
	}

	$scope.openBookNeedShop = function(demande) {
		if ($scope.isAuthenticated) {
			$scope.selectedDemande = demande;
			$("#bookNeedShopModal").modal('show');
		} else {
			$("#signInModal").modal('show');
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