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
						$scope.nbLignesResultRecherche = data.postShops.length % 2;
					} else {
						$scope.erreurMessage = true;
						$scope.resultRecherche = data.postShops;
					}
				});
			}
	}

	$scope.openBookPostShop = function(shopping) {
		if ($scope.isAuthenticated) {
			$scope.propShop = shopping;
			$("#bookPostShopModal").modal('show');
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
