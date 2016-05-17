app.controller("BookPostShopCtrl", function($scope, $http, $timeout) {


	$scope.erreurLimiteArticles = false;
	$scope.displayTable = false;
	$scope.articles = [];
	$scope.nbrTotalArticles = 0;
	$scope.reservationEnvoyee=false;
	$scope.reservationNonValide=false;
	$scope.erreurChampVide = false;
	$scope.modal = {};
	$scope.modal.nbrArticle=1;
	$scope.noArticles = false;

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
			$scope.noArticles = false;
		}
		else {
			$scope.erreurChampVide = true;
		}
	};

	$scope.resetErreur = function () {
		$scope.erreurChampVide = false;
	};

	$scope.$watch('nbrTotalArticles', function() {
		if($scope.selectedProposition != undefined) {
			if((($scope.modal.nbrArticle + $scope.nbrTotalArticles) <= 5 && $scope.selectedProposition.nbArticle == 0) || (($scope.modal.nbrArticle + $scope.nbrTotalArticles) <= 11 && $scope.selectedProposition.nbArticle == 1) || $scope.selectedProposition.nbArticle == 2) {
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

	$scope.bookPostShop = function () {
		if($scope.nbrTotalArticles == 0) {
			$scope.noArticles = true;
		}
		else {
			var datas = {
				"nbrArticleTotal": $scope.nbrTotalArticles,
				"adresseLivraisonBookeur": $scope.adresseField,
				"idPostShop": $scope.selectedProposition._id,
				"articles": $scope.articles
			}

			var res = $http({
				method : 'POST',
				url : '/ws-post-shop/add-bookeur',
				data : datas
			}).success(function (data, status, headers, config) {
				if (data.err == null) {
					$scope.reservationEnvoyee = true;
					$scope.selectedProposition.isAlreadyBookeur = true;
				}
			});
		}
	};

	$('#bookPostShopModal').on('hidden.bs.modal', function () {
		if ($scope.reservationEnvoyee) {
			$scope.selectedProposition.isAlreadyBookeur = true;
			$scope.reservationEnvoyee = false;
			$scope.erreurLimiteArticles = false;
			$scope.displayTable = false;
			$scope.articles = [];
			$scope.nbrTotalArticles = 0;
			$scope.reservationNonValide=false;
			$scope.erreurChampVide = false;
			$scope.modal = {};
			$scope.modal.nbrArticle=1;
			$scope.noArticles = false;
			$scope.$apply();
		}
	});

});