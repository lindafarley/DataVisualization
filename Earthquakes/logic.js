// Building API query URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
// Grabbing the data with d3..
d3.json(url, function(response) {
  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through our data...
  for (var i = 0; i < response["features"].length; i++) {
    // set the data location property to a variable
    //console.log(response.features[i].geometry.coordinates);
    coordinates = response.features[i].geometry.coordinates;
   //console.log(response.features[i].properties.mag)
    mag = response.features[i].properties.mag;

    // If the data has a coordinates property...
    if (coordinates) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.circleMarker([coordinates[1], coordinates[0]], {radius: mag*10, color:chooseColor(mag),fillColor:chooseColor(mag),fillOpacity:0.75}).bindPopup("Mag:" + mag));
    }
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/lindafarley/cjfe4vzc68owc2rmi1kij36zc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZGFmYXJsZXkiLCJhIjoiY2plcHNkcXhmNXI1MjMybG56ZG1ucXY5MSJ9.wfrRA-qu-Cs831EgO9dfkQ";
var darkmap = "https://api.mapbox.com/styles/v1/lindafarley/cjfege0nx57zm2sp8t7krlrlh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGluZGFmYXJsZXkiLCJhIjoiY2plcHNkcXhmNXI1MjMybG56ZG1ucXY5MSJ9.wfrRA-qu-Cs831EgO9dfkQ"
//var plates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

//var flines = L.geoJSON(plates_url);

 // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Base map": mapbox,
    "Dark Map": darkmap
    };

   var overlayMaps = {
   	"Earthquakes": url,
   	//"Fault Lines": fLines
   }


// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);
L.tileLayer(darkmap).addTo(myMap);



// Function that will determine the color of an earthquake marker based on its magnitude
function chooseColor(magnitude) {
    if (magnitude <= 2) {
      return "green"
    };
    if (magnitude > 2 && magnitude <= 4) {
      return "yellow";
    }
    if (magnitude > 4 && magnitude <= 6){
      return "orange";
    }
    if (magnitude > 6 && magnitude <= 7) {
    	return "red";
    }
     else {
     	return "blue"
     }
}     	
    
function addlegends(){
    var legend = L.control({position: 'topright'});
    legend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2 ,3] //actual data value
        // loop through our density intervals and generate a label with a colored square for each interval
        var bcolor="";
        var lbl="";
        div.innerHTML='<font size=3 color=red>Magnitude:</font><br>';
        for (var i = 0; i < grades.length; i++) 
        {
            if (grades[i]==0){bcolor="green";lbl="0-2"}
            if (grades[i]==1){bcolor="yellow";lbl="2-4"}
            if (grades[i]==2){bcolor="orange";lbl="4-6"}
            if (grades[i]==3){bcolor="red";lbl="6-7"}
            div.innerHTML += '<font size=2 color="' + bcolor + '">'+lbl+'</font>' + '<br>';
        }
    return div;
    };
    legend.addTo(myMap);
  }
  addlegends();

 
L.control.layers(baseMaps, overlayMaps).addTo(myMap);