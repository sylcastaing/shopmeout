// Controller de la recherche de proposition de shopping
app.controller("SearchPostShopCtrl", function($scope, $http, $timeout) {

	// Affectation de la map à la variable mapSearch
	$scope.mapSearch = shopMap.init({
		mapId : "mapSearchPostShop"
	});

	// On cache la map tant qu'on a pas cliqué sur la loupe
	$("#mapSearchPostShop").hide();
	$scope.showDiv = true;

	// Chargement de l'adresse via l'objet stocké dans le scope main
	$timeout(function() {
		if($scope.userConnected != undefined) {
			$scope.adresseField =$scope.userConnected.adresse + " " + $scope.userConnected.codePostal + " " + $scope.userConnected.ville;
			$scope.email = $scope.userConnected.email;
			$scope.isAuthenticated = true;
		}
		else {
			$scope.adresseField = "";
		}
	}, 500);
	
	// Fonction permettant de ouvrir la map avec l'adresse rentrée dans le champ adéquat
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

	// Fonction se déclencheant lorsque l'on valide un magasin, affiche la suite du formulaire de recherche
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

	// Recherche des propositions de shopping lorsque l'on a fini de remplir le formulaire de recherche
	$scope.searchPostShop = function() {
			//console.log($scope.userConnected);
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
					if ($scope.isAuthenticated && data.postShops.length != 0) {
						var tabAdress = [];
						var tabDisable = [];
						var tabRes = [];
						for(i in data.postShops) {
							tabAdress.push(data.postShops[i].adresse);
							tabDisable[i] = false;
							if(data.postShops[i].mailShoppeur == $scope.email){
								tabDisable[i] = true;
							}
						}
						distanceManager.getDistance(tabAdress, $scope.adresseField, function(distances) {
							for(i in distances) {
								if((data.postShops[i].distance == 0 && distances[i] < 1000)
									|| (data.postShops[i].distance == 1 && distances[i] < 5000)
									|| (data.postShops[i].distance == 2 && distances[i] < 10000)
									|| (data.postShops[i].distance == 3)) {
									tabRes.push({"post" : data.postShops[i], "var" : tabDisable[i]});
								}
							}
							$scope.resultRecherche = tabRes;
							$scope.erreurMessage = true;
							$scope.$apply();
						});
					} else {
						$scope.erreurMessage = true;
						$scope.resultRecherche = data.postShops;
					}
				});
			}
	}

	// Fonction d'ouverture du modal de reservation de proposition
	$scope.openBookPostShop = function(shopping) {
		if ($scope.isAuthenticated) {
			console.log($scope);
			$scope.selectedProposition = shopping.post;
			$("#bookPostShopModal").modal('show');
		} else {
			$("#signInModal").modal('show');
		}
	}
})
// Directive permettant de faire fonctionner les boutons radio du formulaire
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
// Directive permettant de valider une adresse sur la map avec le bouton "entrer"
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
