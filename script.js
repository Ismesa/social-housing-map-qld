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

  // Define the default style for features
  var defaultStyle = {
    strokeWeight: 0.5,
    fillOpacity: 0  // Adjust the opacity as needed
  };

  // Define the highlight style for features during mouseover
  var highlightStyle = {
    strokeWeight: 0.5,
    fillOpacity: 0.2  // Increase opacity during mouseover
  };

  // Set the default style for each feature
  map.data.setStyle(defaultStyle);

  // Create an InfoWindow to display content on mouseover
  var infoWindow = new google.maps.InfoWindow();

  // Add a mouseover event listener for each feature
  map.data.addListener("mouseover", function(event) {
    // Apply the highlight style to the hovered feature
    map.data.overrideStyle(event.feature, highlightStyle);

    // Get the suburb name from the feature's properties
    var suburbName = event.feature.getProperty("qld_loca_2");

    // Get the percentage of social housing applications
    var percentage = "Test"

    // Construct the InfoWindow content with suburb name and percentage
    var content = suburbName + ": " + percentage + " % of social housing applications";

    // Update the InfoWindow content with the suburb name
    infoWindow.setContent(content);

    // Open the InfoWindow at the event's latLng
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  // Add a mouseout event listener to revert to default style and close InfoWindow
  map.data.addListener("mouseout", function(event) {
    // Revert to the default style for the feature
    map.data.overrideStyle(event.feature, defaultStyle);

    // Close the InfoWindow
    infoWindow.close();
  });
};