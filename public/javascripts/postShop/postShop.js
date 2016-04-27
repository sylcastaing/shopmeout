var app = angular.module('sample', []);

app.controller("PostShop2Ctrl", function($scope, $http) {

	$scope.removeErrorDistance = function() {
 		if($scope.postShop.$error.distanceError) {
 			$scope.postShop.$error.distanceError = false;
 		}
 	}
 	$scope.removeErrorNbShoppeur = function() {
 		if($scope.postShop.$error.NbShoppeurError) {
 			$scope.postShop.$error.NbShoppeurError = false;
 		}
 	}
 	$scope.removeErrorNbArticle = function() {
 		if($scope.postShop.$error.NbArticleError) {
 			$scope.postShop.$error.NbArticleError = false;
 		}
 	}

	$scope.addPostShop = function() {
		var isOK = true;
		if($scope == undefined || $scope.data.distance == undefined) {
			$scope.postShop.$error.distanceError = true;
			isOK = false;
		}
		if($scope == undefined || $scope.data.nbShoppeur == undefined) {
			$scope.postShop.$error.NbShoppeurError = true;
			isOK = false;
		}
		if($scope == undefined || $scope.data.nbArticle == undefined) {
			$scope.postShop.$error.NbArticleError = true;
			isOK = false;
		}
		if($scope.data.date == undefined) {
			$scope.postShop.$error.dateShopping = true;
			isOK = false;
		} 
		if(isOK) {
			$scope.postShop.$error.dateShopping = false;
			$scope.postShop.$error.distanceError = false;
			$scope.postShop.$error.NbShoppeurError = false;
			$scope.postShop.$error.NbArticleError = false;
 			$scope.postShop.dateShopping.$invalid = false;
		console.log($scope.data)
		var res = $http({
			method : 'POST',
			url : '/ws-post-shop/postShop',
			data : $scope.data
		}).success(function (data, status, headers, config){
			if(data.statut==false) {
				$scope.postShop.$error.addPostShop = true;
				$scope.postShop.$error.message = data.err;
			}
			else {
				document.location = '/';
			}
		}).error(function (data, status, headers, config){
			$scope.postShop.$error.addPostShop = true;
			$scope.postShop.$error.message = "Problème serveur";
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