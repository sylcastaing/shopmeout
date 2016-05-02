app.controller("NeedShopCtrl", function($scope, $http) {

 	$scope.removeErrorNbArticle = function() {
 		if($scope.needShop.$error.NbArticleError) {
 			$scope.needShop.$error.NbArticleError = false;
 		}
 	}
 		// On récupère l'adresse
	var res = $http({
		method : 'GET',
		url : '/ws-users/consult-profile'
	}).success(function (data, status, headers, config){
		if(data.user != null) {
			$scope.adresse = data.user.adresse + " " + data.user.codePostal;
		}
		});
	$scope.addNeedShop = function() {
		var isOK = true;
		$scope.data.adresse = $scope.adresse;
		console.log($scope.data.adresse);
		if($scope == undefined || $scope.data.nbArticle == undefined) {
			$scope.needShop.$error.NbArticleError = true;
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
			$scope.needShop.$error.NbArticleError = false;
 			$scope.needShop.dateShopping.$invalid = false;
 			$scope.needShop.adresse.$invalid = false;
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
				document.location = '/';
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