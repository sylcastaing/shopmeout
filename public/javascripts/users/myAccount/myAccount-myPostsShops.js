app.controller("myPostsShopsCtrl", function($scope, $http) {

	$scope.myPostsShops = [];

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-postShops'
	}).success(function (data, status) {
		if (data.postShops) {
			$scope.myPostsShops = data.postShops;
		}
	});

});