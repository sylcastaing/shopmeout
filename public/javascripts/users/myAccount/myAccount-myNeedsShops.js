app.controller("myNeedsShopsCtrl", function($scope, $http) {

	$scope.myNeedsShops = [];

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-needShops'
	}).success(function (data, status) {
		if (data.needShops) {
			$scope.myNeedsShops = data.needShops;
		}
	});

});