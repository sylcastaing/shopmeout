app.controller("myShoppingsCtrl", function($scope, $http) {

	$scope.myPostsShops = [];
	$scope.myNeedsShops = [];
	$scope.myPostsShopsHistory = [];
	$scope.myNeedsShopsHistory = [];

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-postShops'
	}).success(function (data, status) {
		if (data.postShops) {
			for (i in data.postShops) {
				postShop = data.postShops[i];
				if (moment(postShop.date).utc() < moment().utc().startOf('day')) {
					$scope.myPostsShopsHistory.push(postShop);
				}
				else {
					$scope.myPostsShops.push(postShop)
				}
			}
		}
	});

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-needShops'
	}).success(function (data, status) {
		if (data.needShops) {
			for (i in data.needShops) {
				needShop = data.needShops[i];
				if (moment(needShop.date).utc() < moment().utc().startOf('day')) {
					$scope.myNeedsShopsHistory.push(needShop);
				}
				else {
					$scope.myNeedsShops.push(needShop);
				}
			}
		}
	});

});