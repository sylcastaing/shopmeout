app.controller("BookPostShopCtrl", function($scope, $http, $location, $timeout) {


	$scope.erreurLimiteArticles = false;
	$scope.displayTable = false;
	$scope.articles = [];
	$scope.nbrTotalArticles = 0;
	$scope.reservationEnvoyee=false;
	$scope.reservationNonValide=false;
	$scope.erreurChampVide = false;
	$scope.modal = {};
	$scope.modal.nbrArticle=1;

	$scope.addArticle = function () {
		if($scope.modal.nameArticle != "" && $scope.modal.nameArticle != undefined) {
			$scope.reservationNonValide = false;
			$scope.displayTable = true;
			$scope.articles.push({
				nomArticle: $scope.modal.nameArticle,
				nbrArticle: $scope.modal.nbrArticle
			});
			$scope.nbrTotalArticles = $scope.nbrTotalArticles + $scope.modal.nbrArticle;
			$scope.modal.nameArticle="";
			$scope.modal.nbrArticle=1;
		}
		else {
			$scope.erreurChampVide = true;
		}
	};

	$scope.resetErreur = function () {
		$scope.erreurChampVide = false;
	}


	$scope.bookPostShop = function () {
		if($scope.nbrTotalArticles == 0) {
			$scope.messageErreurReservation = "Vous n'avez aucun articles dans votre liste de courses ! "
			$scope.reservationNonValide = true;
		}
		else {
			$scope.reservationNonValide = false;
			var datas = {
			"nbrArticleTotal": $scope.nbrTotalArticles,
			"adresseLivraisonBookeur": $scope.adresseField,
			"idPostShop": $scope.propShop._id,
			"articles": $scope.articles,
			"statut": "En attente"
			}

			var res = $http({
				method : 'POST',
				url : '/ws-book-post-shop/bookPostShop',
				data : datas
			}).success(function (data, status, headers, config) {
					if(data.statut) {
						$timeout(function() {
							$scope.reservationEnvoyee = false;
						}, 3000);
						$scope.reservationEnvoyee=true;
						datas = angular.copy();
						$scope.erreurLimiteArticles = false;
						$scope.displayTable = false;
						$scope.articles = [];
						$scope.nbrTotalArticles = 0;
						// On récupère l'adresse
						var res = $http({
						method : 'GET',
						url : '/ws-users/consult-profile'
						}).success(function (data, status, headers, config){
						if(data.user != null) {
							$scope.adresseField = data.user.adresse +" "+ data.user.codePostal +" "+data.user.ville;
							$scope.isAuthenticated = true;
						}
						else {
							$scope.adresseField = "";
						}
					});
					}
					else {
						$scope.reservationNonValide=true;
						$scope.messageErreurReservation=data.err;
					}
			});
		}
	};

	$scope.$watch('nbrTotalArticles', function() {
		if($scope.propShop != undefined) {
			if((($scope.modal.nbrArticle + $scope.nbrTotalArticles) <= 5 && $scope.propShop.nbArticle == 0) || (($scope.modal.nbrArticle + $scope.nbrTotalArticles) <= 11 && $scope.propShop.nbArticle == 1) || $scope.propShop.nbArticle == 2) {
				$scope.erreurLimiteArticles = false;
			}
			else {
				$scope.erreurLimiteArticles = true;
			}
		}
	});

	$scope.removeArticle = function (index) {
		$scope.nbrTotalArticles = $scope.nbrTotalArticles - $scope.articles[index].nbrArticle;
		$scope.articles.splice(index, 1);
		if($scope.articles.length == 0){
			$scope.displayTable = false;
		}
	}

});