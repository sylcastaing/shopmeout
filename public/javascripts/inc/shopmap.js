var shopMap = {

	map: null,
	service: null,
	markers: [],
	selectedMarker: null,
	adresse: {
		name: "Bordeaux",
		lat: 44.837789,
		lng: -0.57918
	},
	distance: 10000,
	zoom: 10,
	mapId: "map",
	type: ['grocery_or_supermarket'],

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

	processResults: function (results, status, pagination) {
		if (status !== google.maps.places.PlacesServiceStatus.OK) {
			return;
		} else {
			shopMap.createMarkers(results);

			/*if (pagination.hasNextPage) {
				var moreButton = document.getElementById('more');

				moreButton.disabled = false;

				moreButton.addEventListener('click', function () {
					moreButton.disabled = true;
					pagination.nextPage();
				});
			}*/
		}
	},

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

	closeInfos: function () {
		for (i in shopMap.markers) {
			shopMap.markers[i].infos.close();
		}
	},

	selectMarker: function (id) {
		shopMap.closeInfos();
		markerClicked = shopMap.getMarkerById(id);
		if (markerClicked != null) {
			shopMap.selectedMarker = markerClicked;
			markerClicked.infos.open(shopMap.map, markerClicked);
		}
	},

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

	parseParams: function (params) {
		if (params) {
			if (params.adresse) {
				shopMap.adresse.name = params.adresse;
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

    // Récupére les coordonnées GPS d'une adresse
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

    getContent: function (place) {
    	return '<div>' + place.name + '</div><div>' + place.vicinity + '</div>';
    }

  }
