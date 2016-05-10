app.controller("BookPostShopCtrl", function($scope, $http, $location) {
	
	$("#bookPostShopModal").on('shown.bs.modal', function() {
		var res = $http({
					method : 'POST',
					url : '/ws-post-shop/get-postShop',
					data : {"id" : $location.search().id }
				}).success(function (data, status, headers, config) {
						$scope.propShop = data.postShop;
				});
	});


	$scope.erreurLimiteArticles = false;
	$scope.displayTable = false;
	$scope.articles = [];
	$scope.nbrTotalArticles = 0;
	$scope.nbrArticle=1;
	$scope.reservationEnvoyee=false;
	$scope.reservationNonValide=false;
	$scope.erreurChampVide = false;

	$scope.addArticle = function () {
		if($scope.nomArticle != "" && $scope.nomArticle != undefined) {
			$scope.reservationNonValide = false;
			$scope.displayTable = true;
				$scope.articles.push({
					nomArticle: $scope.nomArticle,
					nbrArticle: $scope.nbrArticle
				});
			$scope.nbrTotalArticles = $scope.nbrTotalArticles + $scope.nbrArticle;
			$scope.nomArticle="";
			$scope.nbrArticle=1;
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
			"idPostShop": $location.search().id,
			"articles": $scope.articles,
			"statut": "En attente"
			}

			var res = $http({
				method : 'POST',
				url : '/ws-book-post-shop/bookPostShop',
				data : datas
			}).success(function (data, status, headers, config) {
					if(data.statut) {
						$scope.reservationEnvoyee=true;
						datas = angular.copy();
						$scope.erreurLimiteArticles = false;
						$scope.displayTable = false;
						$scope.articles = [];
						$scope.nbrTotalArticles = 0;
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
			if((($scope.nbrArticle + $scope.nbrTotalArticles) <= 5 && $scope.propShop.nbArticle == 0) || (($scope.nbrArticle + $scope.nbrTotalArticles) <= 11 && $scope.propShop.nbArticle == 1) || $scope.propShop.nbArticle == 2) {
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