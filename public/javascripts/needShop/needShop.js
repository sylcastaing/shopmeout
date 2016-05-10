app.controller("NeedShopCtrl", function($scope, $http) {
	
 	// On récupère l'adresse
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.adresse = data.user.adresse + " " + data.user.codePostal;
		}
	});
	$scope.displayTable = false;
	$scope.articles = [];
	$scope.nbrTotalArticles = 0;
	$scope.nbrArticle=1;

	$scope.addArticle = function () {
	$scope.displayTable = true;
		$scope.articles.push({
			nomArticle: $scope.nomArticle,
			nbrArticle: $scope.nbrArticle
		});
	$scope.nbrTotalArticles = $scope.nbrTotalArticles + $scope.nbrArticle;
	$scope.needShop.$error.articles = false;
	$scope.nomArticle="";
	$scope.nbrArticle=1;
	};

	$scope.removeArticle = function (index) {
		$scope.nbrTotalArticles = $scope.nbrTotalArticles - $scope.articles[index].nbrArticle;
		$scope.articles.splice(index, 1);
		if($scope.articles.length == 0){
			$scope.displayTable = false;
		}
	}

	$scope.addNeedShop = function() {
		var isOK = true;
		$scope.data.articles = $scope.articles;
		$scope.data.adresse = $scope.adresse;
		$scope.data.nbArticle = $scope.nbrTotalArticles;
		if($scope == undefined || $scope.data.articles == 0) {
			$scope.needShop.$error.articles = true;
			isOK = false;
		}
		if($scope.data.adresse == undefined) {
			$scope.needShop.$error.adresse = true;
			isOK = false;
		} 
		if($scope.data.dateShopping == undefined) {
			$scope.needShop.$error.dateShopping = true;
			isOK = false;
		} 
		if(isOK) {
			$scope.needShop.$error.dateShopping = false;
			$scope.needShop.$error.adresse = false;
 			$scope.needShop.dateShopping.$invalid = false;
 			$scope.needShop.adresse.$invalid = false;
			$scope.data.magasin = $scope.selectedMagasin;
			$scope.data.adresseMagasin = $scope.adresseSelectedMagasin;
		var res = $http({
			method : 'POST',
			url : '/ws-need-shop/needShop',
			data : $scope.data
		}).success(function (data, status, headers, config){
			if(data.statut==false) {
				$scope.needShop.$error.addNeedShop = true;
				$scope.needShop.$error.message = data.err;
			}
			else {
				$scope.needShop.$error.validate = true;
				$scope.data = angular.copy();
				// On récupère l'adresse
				var res = $http({
					method : 'GET',
					url : '/ws-users/consult-profile'
				}).success(function (data, status, headers, config){
				if(data.user != null) {
					$scope.adresse = data.user.adresse + " " + data.user.codePostal;
				}
				});
			}
		}).error(function (data, status, headers, config){
			$scope.needShop.$error.addNeedShop = true;
			$scope.needShop.$error.message = "Problème serveur";
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
});