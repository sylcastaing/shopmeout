app.controller("IndexCtrl", function($scope, $location) {
	/*$(function(){
		console.log("test");
	    $('.deplie').hide(); // on masque tout 
	    $('.bouton-deplier').click(function(event){
	        event.preventDefault(); // on ne suit pas le lien
	        $(this).parent().next().slideToggle();
	    });
	    $('.bouton-replier').click(function(event){
	        event.preventDefault(); // on ne suit pas le lien
	        $(this).parent().slideToggle();
	    });
	});*/

	// Gestion de la navigation des onglets avec ancre
	var vm = this;
	vm.currentUrl = "";
	// When the location changes, capture the state of the full URL.
	$scope.$on(
		"$locationChangeSuccess",
		function locationChanged() {
			vm.currentUrl = $location.url();
			// On remplace le / par un #
			vm.ongletCourant = "#" + vm.currentUrl.substring(1, vm.currentUrl.length);
			// On bascule sur le bon onglet
			$('#indexNavTab a[href="' + vm.ongletCourant + '"]').tab('show');
		}
	);
})

.directive("ngAnchor",
	function anchorDirective( $location, $anchorScroll ) {
		// Return the directive configuration object.
		return({
			link: link,
			restrict: "A"
		});
	// I bind the JavaScript events to the view-model.
	function link( scope, element, attributes ) {
		// Whenever the attribute changes, we have to update our HREF state
		// to incorporate the new ngAnchor value as the embedded fragment.
		attributes.$observe( "ngAnchor", configureHref );
		// Whenever the the location changes, we want to update the HREF value
		// of this link to incorporate the current URL plus the URL-fragment
		// that we are watching in the ngAnchor attribute.
		scope.$on( "$locationChangeSuccess", configureHref );
		// I update the HREF attribute to incorporate both the current top-
		// level fragment plus our in-page URL-fragment intent.
		function configureHref() {
			var fragment = ( attributes.ngAnchor || "" );
			// Strip off the leading # to make the string concatenation
			// handle variable-state inputs (ie, ones that may or may not
			// include the leading pound sign).
			if ( fragment.charAt( 0 ) === "#" ) {
				fragment = fragment.slice( 1 );
			}
			// Since the anchor is really the fragment INSIDE the fragment,
			// we have to build two levels of fragment.
			var routeValue = ( "#" + $location.url().split( "#" ).shift() );
			var fragmentValue = ( "#" + fragment );
			attributes.$set( "href", ( routeValue + fragmentValue ) );
		}
	}
});