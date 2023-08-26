// Define the initialization function
function initMap() {

  // Specify the center coordinates for the map
  var centerCoords = { lat: -27.4705, lng: 153.0260 }; // Brisbane, QLD

  // Create a new map instance
  var map = new google.maps.Map(document.getElementById('map'), {
      center: centerCoords,
      zoom: 10 // Adjust the zoom level as needed
  });

  // Load GeoJSON data to get outline of suburbs
  map.data.loadGeoJson("https://data.gov.au/geoserver/qld-suburb-locality-boundaries-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_6bedcb55_1b1f_457b_b092_58e88952e9f0&outputFormat=json");

  // Define the default style for features
  var defaultStyle = {
    strokeWeight: 0.5,
    fillOpacity: 0.3,  
    fillColor: "#008000",
  };

  // Load the CSV data using PapaParse
  Papa.parse("data.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      var data = results.data;

      // Listen for the 'addfeature' event after GeoJSON data is loaded
      map.data.addListener("addfeature", function(event) {
        var feature = event.feature; // Get the current GeoJSON feature
        var featureSuburbName = feature.getProperty('qld_loca_2');

        // Iterate through each row of CSV data
        data.forEach(row => {
          var suburb = row["Suburbs"];
          if (suburb) {
            suburb = suburb.toUpperCase();
            var numApplicants = parseFloat(row["Number"]);

            if (featureSuburbName == suburb) {
              // Apply the appropriate fillColor based on numApplicants
              var fillColor = "#008000"; // Default dark green
              if (numApplicants >= 1000) {
                fillColor = "#FF0000"; // Red
              } else if (numApplicants >= 100 && numApplicants < 1000) {
                fillColor = "#FFA500"; // Orange
              } else if (numApplicants >= 1 && numApplicants < 100) {
                fillColor = "#FFFF00"; // Yellow
              }
              // Override the feature's style
              map.data.overrideStyle(feature, { fillColor: fillColor });
              map.data.overrideStyle(feature, { fillOpacity: 0.8 });
            } 
          }
        });
      });
    }
  });

  // Define the highlight style for features during mouseover
  var highlightStyle = {
    fillOpacity: 0.8  // Increase opacity during mouseover
  };

  var postHighlightStyle = {
    fillOpacity: 0.3
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
    var content = suburbName + ": " + percentage + " % of QLD social housing applications";

    // Update the InfoWindow content with the suburb name
    infoWindow.setContent(content);

    // Open the InfoWindow at the event's latLng
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  // Add a mouseout event listener to revert to default style and close InfoWindow
  map.data.addListener("mouseout", function(event) {
    // Revert to the default style for the feature
    map.data.overrideStyle(event.feature, postHighlightStyle);

    // Close the InfoWindow
    infoWindow.close();
  });
};