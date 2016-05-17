app.controller("myAccountCtrl", function($scope, $http) {

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

	$scope.$on(
		"$locationChangeSuccess",
		function locationChanged() {
			vm.currentUrl = $location.url();
			// On remplace le / par un #
			vm.ongletCourant = "#" + vm.currentUrl.substring(1, vm.currentUrl.length);
			// On bascule sur le bon onglet
			$('#myAccountTabs a[href="' + vm.ongletCourant + '"]').tab('show');
		});

	$scope.openListArticles = function(demande) {
		$scope.selectedDemande = demande;
		$("#listArticlesModal").modal('show');
	}

	$scope.openMoreInfosPostShop = function(proposition) {
		console.log(proposition);
		$scope.selectedProposition = proposition;
		$("#MoreInfosPostShopModal").modal('show');
	}

	$scope.openMoreInfosNeedShop = function(demande) {
		$scope.selectedDemande = demande;
		$("#MoreInfosNeedShopModal").modal('show');
	}

	$scope.openMoreInfosUserModal = function(mail, nom, prenom) {
		$scope.selectedShoppeur = {};
		$scope.selectedShoppeur.mail = mail;
		$scope.selectedShoppeur.nom = nom;
		$scope.selectedShoppeur.prenom = prenom;
		$("#openMoreInfosUserModal").modal('show');
	}
});
