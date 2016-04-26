var app = angular.module('sample', []);

app.controller("PostShopCtrl", function($scope, $http) {
	$scope.distance = "0";
	$scope.nbShoppeur = "1";
	$scope.nbArticle = "1";
	$scope.addPostShop = function() {
		$scope.dataLoading = true;
		if($scope == undefined) {
 			console.log("toto");
 		}
 		else {
			console.log($scope.distance);
			console.log($scope.nbShoppeur);
			console.log($scope.nbArticle);
 		}
		
		/*var res = $http({
			method : 'POST',
			url : '/ws-post-shop/postShop',
			data : $scope.postShop
		}).success(function (data, status, headers, config){
			if(data.statut==false) {
				$scope.postShop.$error.addPostShop = true;
				$scope.postShop.$error.message = data.err.message;
				$scope.dataLoading = false;
			}
			else {
				 document.location = '/';
			}
		}).error(function (data, status, headers, config){
				$scope.postShop.$error.addPostShop = true;
			$scope.postShop.$error.message = "Problème serveur";
			$scope.dataLoading = false;
		});*/
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