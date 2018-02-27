// Get reference to tbody tag
var $tbody = document.querySelector("tbody");
//Get references to input id's
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
//Get references to search button id's
var $searchBtnDate = document.querySelector("#searchdate");
var $searchBtnCity = document.querySelector("#searchcity");
var $searchBtnState = document.querySelector("#searchstate");
var $searchBtnCountry = document.querySelector("#searchcountry");
var $searchBtnShape = document.querySelector("#searchshape");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtnDate.addEventListener("click", handleSearchButton);
$searchBtnCity.addEventListener("click", handleSearchButton);
$searchBtnState.addEventListener("click", handleSearchButton);
$searchBtnCountry.addEventListener("click", handleSearchButton);
$searchBtnShape.addEventListener("click", handleSearchButton);

// Set dataSet array from data.js to variable: data 
var data = dataSet;

// renderTable renders the data as a table to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    // Get get the current address object and its fields
    var alien = data[i];
    var fields = Object.keys(alien);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = alien[field];
    }
  }
}

function handleSearchButton() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();


  var filteredData = dataSet;

  // If the filterDate field is not blank, filter all objects by that date and add them to the searchResults array
  if (filterDate != "") {
  	filteredData = filteredData.filter(function(object) {
  	var objectDate = object.datetime.toLowerCase();
    // If true, add the object to table when rendering
    return objectDate === filterDate;
  });
}
  // If the filterCity field is not blank, filter all objects by that city and add them to the searchResults array 	
  if (filterCity != "") {
  	// Set data to an array of all objects whose "city" matches the filter
  	filteredData = filteredData.filter(function(object) {
    var objectCity = object.city.toLowerCase();
    // If true, add the object to the searchResults array
    return objectCity === filterCity;
  });
}

// If the filterState field is not blank, filter all objects by that state and add them to the searchResults array
  if (filterState != "") {
  	filteredData = filteredData.filter(function(object) {
  	var objectState = object.state.toLowerCase();
    // If true, add the object to table when rendering
    return objectState === filterState;
  });
}

// If the filterCountry field is not blank, filter all objects by that country and add them to the searchResults array
  if (filterCountry != "") {
  	filteredData = filteredData.filter(function(object) {
  	var objectCountry = object.country.toLowerCase();
    // If true, add the object to table when rendering
    return objectCountry === filterCountry;
  });
}

  // Set data to an array of all objects whose "shape" matches the filter
  if (filterShape != "") {
  	filteredData = filteredData.filter(function(object) {
    var objectShape = object.shape.toLowerCase();

    // If true, add the object to the searchResults array
   	return objectShape === filterShape 
});
}
data = filteredData
renderTable();
}

// Render the table for the first time on page load
renderTable();


