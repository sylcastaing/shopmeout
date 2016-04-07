/**
 * Déclaration de l'application demoApp
 */
var app = angular.module('sample', [
]);

app.controller("SignCtrl", function($scope) {

	$scope.nom = 'Alexandre';

	scope.$watch(check, function (isValid) {
		// Défini si le champ est valide
		control.$setValidity("equalsTo", isValid);
	});

	$(function() {
		$("#date").datepicker();
	});
});