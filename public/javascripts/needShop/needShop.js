app.controller("NeedShopCtrl", function($scope, $http, $timeout) {


	$scope.resetErreur = function () {
		$scope.errorArticleInvalid = false;
	}

	$scope.removeError = function () {
		$scope.needShop.$error.dateNeedShop = false;
	}

 	// On récupère l'adresse
 	var res = $http({
 		method : 'GET',
 		url : '/ws-users/consult-profile'
 	}).success(function (data, status, headers, config){
 		if(data.user != null) {
 			$scope.adresse = data.user.adresse + " " + data.user.codePostal + " " + data.user.ville;
 		}
 	});
 	$scope.displayTable = false;
 	$scope.articles = [];
 	$scope.nbrTotalArticles = 0;
 	$scope.nbrArticle=1;
 	$scope.data={};
 	$scope.addArticle = function () {
 		if( $scope.nomArticle == undefined || $scope.nomArticle == "" || $scope.nbrArticle == 0){
 			$scope.errorArticleInvalid = true;
 		}
 		else{
 			$scope.displayTable = true;
 			$scope.articles.push({
 				nomArticle: $scope.nomArticle,
 				nbrArticle: $scope.nbrArticle
 			});
 			$scope.nbrTotalArticles = $scope.nbrTotalArticles + $scope.nbrArticle;
 			$scope.needShop.$error.articles = false;
 			$scope.nomArticle="";
 			$scope.nbrArticle=1;
 		}
 	};

 	$scope.removeArticle = function (index) {
 		$scope.nbrTotalArticles = $scope.nbrTotalArticles - $scope.articles[index].nbrArticle;
 		$scope.articles.splice(index, 1);
 		if($scope.articles.length == 0){
 			$scope.displayTable = false;
 		}
 	}

 	$scope.addNeedShop = function() {
 		var isOK = true;
 		if($scope == undefined || $scope.articles == 0) {
 			$scope.needShop.$error.articles = true;
 			isOK = false;
 		}
 		if($scope.adresse == undefined || $scope.adresse == null || $scope.adresse == "") {
 			$scope.needShop.$error.adresse = true;
 			isOK = false;
 		} 
 		if($scope.dateNeedShop == undefined || $scope.dateNeedShop == null) {
 			$scope.needShop.$error.dateNeedShop = true;
 			isOK = false;
 		} 
 		if(isOK) {
 			$scope.data.articles = $scope.articles;
 			$scope.data.date = $scope.dateNeedShop;
 			$scope.data.adresse = $scope.adresse;
 			$scope.data.nbArticle = $scope.nbrTotalArticles;
 			$scope.needShop.$error.dateNeedShop = false;
 			$scope.needShop.$error.adresse = false;
 			$scope.needShop.adresse.$invalid = false;
 			$scope.data.magasin = $scope.selectedMagasin;
 			$scope.data.adresseMagasin = $scope.adresseSelectedMagasin;
 			var res = $http({
 				method : 'POST',
 				url : '/ws-need-shop/needShop',
 				data : $scope.data
 			}).success(function (data, status, headers, config){
 				if(data.statut==false) {
 					$scope.needShop.$error.addNeedShop = true;
 					$scope.needShop.$error.message = data.err;
 				} else {
 					$scope.needShop.$error.validate = true;
 					$timeout(function() {
 						$scope.needShop.$error.validate = false;
 					}, 3000);
 					$scope.data = angular.copy();
 					$scope.displayTable = false;
 					$scope.articles = [];
 					$scope.nbrTotalArticles = 0;
 					$scope.errorArticleInvalid = false;
 					$scope.needShop.$error.dateNeedShop = false;
 					$scope.dateNeedShop = null;
 					$scope.data = {};
				// On récupère l'adresse
				var res = $http({
					method : 'GET',
					url : '/ws-users/consult-profile'
				}).success(function (data, status, headers, config){
					if(data.user != null) {
						$scope.adresse = data.user.adresse + " " + data.user.codePostal + " " + data.user.ville;
					}
				});
			}
		}).error(function (data, status, headers, config){
			$scope.needShop.$error.addNeedShop = true;
			$scope.needShop.$error.message = "Problème serveur";
		});
	}
}
})