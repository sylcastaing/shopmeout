app.controller("myShoppingsCtrl", function($scope, $http) {

	$scope.myPostsShops = [];
	$scope.myNeedsShops = [];

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-postShops'
	}).success(function (data, status) {
		if (data.postShops) {
			$scope.myPostsShops = data.postShops;
		}
	});

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-needShops'
	}).success(function (data, status) {
		if (data.needShops) {
			$scope.myNeedsShops = data.needShops;
		}
	});

});