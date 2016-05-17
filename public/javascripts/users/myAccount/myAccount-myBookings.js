app.controller("myBookingsCtrl", function($scope, $http) {

	$scope.myBookNeedShops = [];
	$scope.myBookNeedShopsHistory = [];
	$scope.myBookPostShops = [];
	$scope.myBookPostShopsHistory = [];

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-myBookNeedShops'
	}).success(function (data, status) {
		if (data.needShops.length > 0) {
			for (i in data.needShops) {
				bookNeedShops = data.needShops[i];
				for(j in bookNeedShops.listShoppeurs) {
					if (bookNeedShops.listShoppeurs[j].mailShoppeur == $scope.userConnected.email) {
						bookNeedShops.statut = bookNeedShops.listShoppeurs[j].statut;
					}
				}
				if (moment(bookNeedShops.date).utc() < moment().utc().startOf('day')) {
					$scope.myBookNeedShopsHistory.push(bookNeedShops);
				} else {
					$scope.myBookNeedShops.push(bookNeedShops);
				}
			}
		}
	});

	$http({
		method : 'GET',
		url : '/ws-my-account/consult-myBookPostShops'
	}).success(function (data, status) {
		if (data.postShops.length > 0) {
			for (i in data.postShops) {
				bookPostShops = data.postShops[i];
				for(j in bookPostShops.listBookeurs) {
					if (bookPostShops.listBookeurs[j].mailBookeur == $scope.userConnected.email) {
						bookPostShops.statut = bookPostShops.listBookeurs[j].statut;
						bookPostShops.articles = bookPostShops.listBookeurs[j].articles;
					}
				}
				if (moment(bookPostShops.date).utc() < moment().utc().startOf('day')) {
					$scope.myBookPostShopsHistory.push(bookPostShops);
				} else {
					$scope.myBookPostShops.push(bookPostShops);
				}
			}
		}
	});

});