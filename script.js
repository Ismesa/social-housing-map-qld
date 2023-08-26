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

  // Load the CSV data and perform map setup when it's loaded
  Papa.parse("data.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      var data = results.data;
      var suburbDict = createSuburbDictionary(data);
      //console.log(suburbDict);
      setupMap(map, suburbDict);
    }
  });
}

// This function takes csv data and returns a dictionary where each suburb name is mapped to the number of applicants and percentage
function createSuburbDictionary(data) {
  var suburbDictionary = {};

  data.forEach(row => {
    var suburb = row["Suburbs"];
    if (suburb) {
      var numApplicants = parseFloat(row["Number"]);
      var percentage = parseFloat(row["Percentage of total"]);
      suburbDictionary[suburb.toUpperCase()] = {
        suburbName: suburb,
        numApplicants: numApplicants,
        percentage: percentage.toFixed(4)
      };
    }
  });
  return suburbDictionary;
}

// Setup the map with data and default styles
function setupMap(map, suburbDict) {
  var mapData = map.data;

  mapData.setStyle(function(feature) {
    var featureSuburbName = feature.getProperty('qld_loca_2');
    var suburbInfo = suburbDict[featureSuburbName];

    // Define default values
    var fillColor = "#008000"; // Default dark green
    var originalFillOpacity = 0.3;
    var strokeWeight = 0.5;

    if (suburbInfo) {
      
      if (suburbInfo.numApplicants >= 300) {
        fillColor = "#FF0000"; // Red
        originalFillOpacity = 0.6;
      } else if (suburbInfo.numApplicants >= 100 && suburbInfo.numApplicants < 300) {
        fillColor = "#FFA500"; // Orange
        originalFillOpacity = 0.6;
      } else if (suburbInfo.numApplicants >= 1 && suburbInfo.numApplicants < 100) {
        fillColor = "#FFFF00"; // Yellow
        originalFillOpacity = 0.6;
      }
    }

    return {
      strokeWeight: strokeWeight,
      fillColor: fillColor,
      fillOpacity: originalFillOpacity,
    };
  });

  // Create an InfoWindow to display content on mouseover
  var infoWindow = new google.maps.InfoWindow();

  // Mouseover event listener
  mapData.addListener("mouseover", function(event) {
    
    var featureSuburbName = event.feature.getProperty('qld_loca_2');
    var suburbInfo = suburbDict[featureSuburbName];
    var content;

    if (suburbInfo) {
      content = suburbInfo.suburbName + ": " + suburbInfo.numApplicants + " Application(s) " + "(" + suburbInfo.percentage + "%)";
    } else {
      content = featureSuburbName + ": " + "We good here mate"
    }

    infoWindow.setContent(content);      
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);

    mapData.overrideStyle(event.feature, { 
      fillOpacity: 0.8,
      strokeWeight: 1.5 
    });
  });

  // Mouseout event listener
  mapData.addListener("mouseout", function(event) {
    var featureSuburbName = event.feature.getProperty('qld_loca_2');
    var suburbInfo = suburbDict[featureSuburbName];
    var originalFillOpacity;

    if (suburbInfo) {
      originalFillOpacity = 0.6
    } else {
      originalFillOpacity = 0.3;
    }

    mapData.overrideStyle(event.feature, {
      fillOpacity: originalFillOpacity,
      strokeWeight: 0.5
    });

    infoWindow.close();
});
}