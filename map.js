 //Create a Google Maps Map and place it inside the map div.
	      var map;
	      function initMap() {
	        map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat:-22.98, lng: -43.26},
	          zoom: 12
	        });    
	    // This for loop will loop over the places array and create a Google Maps marker for each of our objects: The marker's title will be the place's name, the position will be the place's spot(a LatLng object) and it's label/id will be the first character in their name.
	    for(var i = 0; i < places.length; i++){
	        	var name = places[i]["name"];
	        	var label = name.charAt(0);
	        	 var marker = new google.maps.Marker({
				    position: places[i]["spot"],
				    map: map,
				    title: name,
				    id : label,
				    label: label,
				    animation: google.maps.Animation.DROP
		  		});
	        	// When a marker is clicked, the map will zoom into it's location.
		  		marker.addListener('click', function() {
					map = marker.getMap();
					map.setZoom(16);
					map.setCenter(this.getPosition());
					});
		  		// When a marker is dbl-clicked, the map will zoom out and back to it's original position.
				marker.addListener('dblclick', function() {
					map = marker.getMap();
					map.setZoom(12);
					map.setCenter({lat:-22.98, lng: -43.26});
					});
				// Here we push our marker into our Markers array as an array with 2 elements: the marker itself and it's name.
				markers.push([marker, places[i]["name"]]);
	        } // End of for loop.
	    } // End of initMap function.