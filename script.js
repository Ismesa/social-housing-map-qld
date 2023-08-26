// Define the initialization function
function initMap() {
  // Specify the center coordinates for the map
  var centerCoords = { lat: -27.4705, lng: 153.0260 }; // Brisbane, QLD

  // Create a new map instance
  var map = new google.maps.Map(document.getElementById('map'), {
      center: centerCoords,
      zoom: 10 // Adjust the zoom level as needed
  });

  // You can add additional code to customize the map here
  map.data.loadGeoJson("https://data.gov.au/geoserver/qld-suburb-locality-boundaries-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_6bedcb55_1b1f_457b_b092_58e88952e9f0&outputFormat=json");

  map.data.setStyle({
    strokeWeight: 0.5
  });
};