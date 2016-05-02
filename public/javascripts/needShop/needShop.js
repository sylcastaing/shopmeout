app.controller("NeedShopCtrl", function($scope, $http) {

 	$scope.removeErrorNbArticle = function() {
 		if($scope.needShop.$error.NbArticleError) {
 			$scope.needShop.$error.NbArticleError = false;
 		}
 	}
console.log("totototototot");
	$scope.addNeedShop = function() {
		var isOK = true;
		if($scope == undefined || $scope.data.nbArticle == undefined) {
			$scope.needShop.$error.NbArticleError = true;
			isOK = false;
		}
		if($scope.data.codePostal == undefined) {
			$scope.needShop.$error.codePostal = true;
			isOK = false;
		} 
		if($scope.data.date == undefined) {
			$scope.needShop.$error.dateShopping = true;
			isOK = false;
		} 
		if(isOK) {
			$scope.needShop.$error.dateShopping = false;
			$scope.needShop.$error.codePostal = false;
			$scope.needShop.$error.NbArticleError = false;
 			$scope.needShop.dateShopping.$invalid = false;
 			$scope.needShop.codePostal.$invalid = false;
		console.log($scope.data)
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