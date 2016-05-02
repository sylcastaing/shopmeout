// Create an application module for our demo.
angular.module( "ShopMeOut", [ "ngRoute" ] );
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// I configure the application routes to make sure that the user cannot go out
// side of the supported route definitions.
angular.module( "ShopMeOut" ).config(
	function configureRoutes( $routeProvider ) {
		$routeProvider
			.when( "/home", {} )
			.when( "/proposerShopping", {} )
			.when( "/demanderShopping", {} )
			.otherwise({
				redirectTo: "/home"
			});
		}
);
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// I control the root of the application.
angular.module( "ShopMeOut" ).controller(
	"AppController",
	function AppController( $scope, $location, $route ) {
		var vm = this;
		vm.currentUrl = "";
		// When the location changes, capture the state of the full URL.
		$scope.$on(
			"$locationChangeSuccess",
			function locationChanged() {
				vm.currentUrl = $location.url();
			}
		);
	}
);
// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //
// I watch the ngAnchor attribute to automatically configure the HREF value to
// use natural URL-fragment behavior in AngularJS.
// --
// NOTE: We don't actually need the $anchorScroll() service; but, we need to
// inject it here in order to guarantee that it is instantiated and starts
// watching the $location for changes.
angular.module( "ShopMeOut" ).directive(
	"ngAnchor",
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