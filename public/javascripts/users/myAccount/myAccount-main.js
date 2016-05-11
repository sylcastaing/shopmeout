app.controller("myAccountCtrl", function($scope, $http) {

	$scope.$on(
		"$locationChangeSuccess",
		function locationChanged() {
			vm.currentUrl = $location.url();
			// On remplace le / par un #
			vm.ongletCourant = "#" + vm.currentUrl.substring(1, vm.currentUrl.length);
			// On bascule sur le bon onglet
			$('#myAccountTabs a[href="' + vm.ongletCourant + '"]').tab('show');
		});
});