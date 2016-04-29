app.controller("SearchPostShopCtrl", function($scope, $http) {

	shopMap.init();

	$scope.isDisabled = true;
	$scope.boutonAdresse = "Changer mon adresse";

	$scope.$watch(function () {
		return shopMap.selectedMarker;
	}, function (value) {
		console.log("chanegements " + value);
	});

	$scope.checkDateRequired = function() {
		if($scope.date != undefined) {
			$scope.postshop.$error.dateRequired = false;
			if($scope.adresseField != undefined && $scope.adresseField != "") {
				$scope.postshop.$error.$invalid = false;
			}
		}
	}

	$scope.search = function() {
		shopMap.init({
			adresse: $scope.adresseField,
			distance: 2000
		});
	}


	// On récupère l'adresse
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.adresseField = data.user.adresse;
			$scope.search();
		}
		else {
			$scope.adresseField = "";
			$scope.boutonAdresse = "Valider";
			$scope.isDisabled = false;
			$scope.postshop.$error.$invalid = true;
		}



	$scope.searchPostShop = function() {
		if($scope.date == undefined) {
			$scope.postshop.$error.dateRequired = true;
			$scope.postshop.$error.$invalid = true;
			$scope.resultRecherche = "";
		}
		/*else if(shopMap.selectedMarker == null) {
			$scope.postshop.$error.selectRequired = true;
			$scope.postshop.$error.$invalid = true;
			$scope.resultRecherche = "";
		}*/
		else {
			var critereProp = [{
				"magasin": shopMap.selectedMarker.title,
				"date": $scope.date
	$scope.searchPostShop = function() {
		if($scope.date == undefined) {
			$scope.postshop.$error.dateRequired = true;
			$scope.postshop.$error.$invalid = true;
			$scope.resultRecherche = "";
		}
		/*else if(shopMap.selectedMarker == null) {
			$scope.postshop.$error.selectRequired = true;
			$scope.postshop.$error.$invalid = true;
			$scope.resultRecherche = "";
		}*/
		else {
			var critereProp = [{
				"magasin": shopMap.selectedMarker.title,
				"date": $scope.date
	$scope.searchPostShop = function() {
		if($scope.date == undefined) {
			$scope.postshop.$error.dateRequired = true;
			$scope.postshop.$error.$invalid = true;
			$scope.resultRecherche = "";
		}
		/*else if(shopMap.selectedMarker == null) {
			$scope.postshop.$error.selectRequired = true;
			$scope.postshop.$error.$invalid = true;
			$scope.resultRecherche = "";
		}*/
		else {
			var critereProp = [{
				"magasin": shopMap.selectedMarker.title,
				"date": $scope.date
		$scope.searchPostShop = function() {
			if($scope.date == undefined) {
				$scope.postshop.$error.dateRequired = true;
				$scope.postshop.$error.$invalid = true;
				$scope.resultRecherche = "";
			}
			else if(shopMap.selectedMarker == null) {
				$scope.postshop.$error.selectRequired = true;
				$scope.postshop.$error.$invalid = true;
				$scope.resultRecherche = "";
			}
			else {
				var critereProp = [{
					"magasin": shopMap.selectedMarker.title,
					"date": $scope.date
				//"nbArticle": $scope.nbArticle,
			}];

			var res = $http({
					method : 'POST',
					url : '/ws-post-shop/search-postShop',
					data : critereProp
				}).success(function (data, status, headers, config) {
					if(data.length>0) {
						$scope.resultRecherche = data;
					}
					else {
						$scope.resultRecherche = "Il n'y a pas de résultats, désolé"
					}
		}
	}

});

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