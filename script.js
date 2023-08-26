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
  map.data.loadGeoJson("https://data.gov.au/geoserver/qld-local-government-areas-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_16803f0b_6934_41ae_bf82_d16265784c7f&outputFormat=json")
};