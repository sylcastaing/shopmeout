/**
 * Permet de générer une map avec les magasin autour d'une adresse
 *
 * Initialisation : 
 *
 * Appeler la fonction init() en lui passant en paramètre les informations
 *
 * ex : init({
 * 	adresse: String,
 * 	distance: int,
 * 	zoom: int,
 * 	mapId: String,
 * })
 */
 var shopMap = {

	// Map google
	map: null,
	// Service Google Place
	service: null,
	// Liste des markers pour la recherche courante
	markers: [],
	// Marker selectionné
	selectedMarker: null,
	// Adresse 
	adresse: {
		name: "Bordeaux France",
		lat: 44.837789,
		lng: -0.57918
	},
	// Distance de recherche
	distance: 10000,
	// Zoom par defaut de la ap
	zoom: 10,
	// Id de la map
	mapId: "map",
	// Type de recherche
	type: ['grocery_or_supermarket'],
	// URL API maps
	urlAPI: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgmlzGZ-cNthmweounvx1AI7ojd1jwnKw&signed_in=true&libraries=places&callback=gmap_draw",
	// API include
	apiInclude: false,

	apiCharged: false,

	/**
	 * Initilisation de la map
	 * @param  Object  params   Liste des paramètres
	 * @param  Function callback Fonction de retour
	 */
	 init: function (params, callback) {
	 	shopMap.markers = [];
	 	shopMap.parseParams(params);
	 	
	 	shopMap.getGeocode(function (result) {
	 		if (!result.status) {
	 			callback(result);
	 		} else {
	 			shopMap.map = new google.maps.Map(document.getElementById(shopMap.mapId), {
	 				center: shopMap.adresse,
	 				zoom: shopMap.zoom
	 			});
	 			shopMap.service = new google.maps.places.PlacesService(shopMap.map);
	 			shopMap.service.nearbySearch({
	 				location: shopMap.adresse,
	 				radius: shopMap.distance,
	 				types: shopMap.type,
	 			}, shopMap.processResults);
	 		}
	 	});
	 	
	 },

	/**
	 * Affichage du résultat
	 * @param Object results
	 * @param  String status
	 * @param  Object pagination
	 */
	 processResults: function (results, status, pagination) {
	 	if (status !== google.maps.places.PlacesServiceStatus.OK) {
	 		return;
	 	} else {
	 		shopMap.createMarkers(results);
	 	}
	 },

	/**
	 * Creation des marqueurs sur la map
	 * @param  table places 
	 */
	 createMarkers: function (places) {
	 	var bounds = new google.maps.LatLngBounds();

	 	for (var i = 0, place; place = places[i]; i++) {
	 		var marker = new google.maps.Marker({
	 			id: place.id,
	 			map: shopMap.map,
	 			title: place.name,
	 			position: place.geometry.location,
	 			infos: new google.maps.InfoWindow({
	 				content: shopMap.getContent(place)
	 			})
	 		});

	 		marker.addListener('click', function () {
	 			shopMap.closeInfos();
	 			shopMap.selectedMarker = this;
	 			this.infos.open(shopMap.map, this);
	 		});

	 		shopMap.markers.push(marker);

	 		bounds.extend(place.geometry.location);
	 	}

	 	shopMap.map.fitBounds(bounds);
	 },

	/**
	 * Fermeture de toutes les infos bulles
	 */
	 closeInfos: function () {
	 	for (i in shopMap.markers) {
	 		shopMap.markers[i].infos.close();
	 	}
	 },

	/**
	 * Selectionne un marker en fonction de son id
	 * @param  String id
	 */
	 selectMarker: function (id) {
	 	shopMap.closeInfos();
	 	markerClicked = shopMap.getMarkerById(id);
	 	if (markerClicked != null) {
	 		shopMap.selectedMarker = markerClicked;
	 		markerClicked.infos.open(shopMap.map, markerClicked);
	 	}
	 },

	/**
	 * Retourne un marker en fonction 
	 * @param  String id
	 */
	 getMarkerById: function (id) {
	 	retour = null;
	 	for (i in shopMap.markers) {
	 		currentMarker = shopMap.markers[i];
	 		if (currentMarker.id == id) {
	 			retour = currentMarker;
	 			break;
	 		}
	 	}
	 	return retour;
	 },

	/**
	 * Récupération des pramatrèes d'entrée
	 * @param  Object params
	 */
	 parseParams: function (params) {
	 	if (params) {
	 		if (params.adresse) {
	 			shopMap.adresse.name = params.adresse + " France";
	 		}
	 		if (params.distance) {
	 			shopMap.distance = params.distance;
	 		}
	 		if (params.zoom) {
	 			shopMap.zoom = params.zoom;
	 		}
	 		if (params.mapId) {
	 			shopMap.mapId = params.mapId;
	 		}
	 	}
	 },

	/**
	 * Récupère les coordonnées GPS d'une adresse
	 * @param  Function callback
	 */
	 getGeocode: function (callback) {
	 	$.get("http://maps.googleapis.com/maps/api/geocode/json", {
	 		address: shopMap.adresse.name
	 	}, function (data) {
	 		if (data.status == 'OK') {
	 			shopMap.adresse.lat = data.results[0].geometry.location.lat;
	 			shopMap.adresse.lng = data.results[0].geometry.location.lng;
	 			callback({
	 				status: true,
	 				err: ""
	 			})
	 		} else {
	 			callback({
	 				status: false,
	 				err: "Impossible de localiser l'adresse"
	 			});
	 		}
	 	});
	 },

	/**
	 * Formattage du contenu des Infos Bulles
	 * @param  Object place
	 */
	 getContent: function (place) {
	 	url = 'https://www.google.com/maps/place/' + encodeURIComponent(place.name) + '/@' + place.geometry.location.toUrlValue() + ',20z/';
	 	content = '';
	 	content += '<div class="mapShop-infos">';
	 	content += '<div class="titre">' + place.name + '</div>';
	 	content += '<div class="adresse">' + place.vicinity + '</div>';
	 	content += '<a class="lien" href="' + url + '" target="_blank">Plus d\'informations</a>';
	 	content += '</div>'
	 	return content;
	 },

	 on_myproperty_change: function(){
	 	$scope.$digest();
	 }

	}
