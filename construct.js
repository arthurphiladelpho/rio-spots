//  A Container div -> to hold all elements in our html page.
  var container = document.createElement('div');
  container.id = 'container';
// A Logo Div -> contains website logo and name.
  var logoDiv = document.createElement('div');
  logoDiv.id = "logoDiv";
  container.appendChild(logoDiv);
  var logoImg = document.createElement('img');
  logoImg.id = "logoImg";
  logoImg.src = "logo-small.png";
  logoDiv.appendChild(logoImg);
// A topbar div -> holds our buttons, search bar and logo.
  var topbar = document.createElement('div');
  topbar.id = 'topbar';
  container.appendChild(topbar);
// A Button Container
  var buttonContainer = document.createElement('div');
  buttonContainer.id = 'buttonContainer';
  topbar.appendChild(buttonContainer);
// Create a title
  var titleDiv = document.createElement('div');
  titleDiv.id = "titleDiv";
  container.appendChild(titleDiv);
  var title = document.createElement('h2');
  title.id = "title";
  title.innerHTML = "Rio de Janeiro";
  titleDiv.appendChild(title);
// Create a Map div -> will hold our Google Maps map.
  var map = document.createElement('div');
  map.id = 'map';
  container.appendChild(map);
// Results Div -> will hold our main table
  var resultsDiv = document.createElement('div');
  resultsDiv.id = "resultsDiv";
  container.appendChild(resultsDiv);
// A Full Results table -> holds results for the current moment.
  var resultsTable = document.createElement('table');
  resultsTable.id = "resultsTable";
  container.appendChild(resultsTable);
// A Results table -> holds results for the current moment.
  var currentResults = document.createElement("table");
  currentResults.id = "currentResults";
  currentResults.style.float = "left";
  resultsTable.appendChild(currentResults);
// A Future Results div -> holds results for the future moments.
  var futureResults = document.createElement("table");
  futureResults.id = "futureResults";
// A Footer div -> to finish out our website.
  var footerDiv = document.createElement('div');
  footerDiv.id = "footerDiv";
  container.appendChild(footerDiv);
// Create an array to hold all of our Google Maps Markers.
  var markers = [];
// A Variable that will hold our returned resutls.
  var newResults;
// An Array that will hold every newResults variable
  var newResultsArray = [];
// The chunk of code below will get the current time in Rio in UNIX time (seconds since Jan 1st 1970). 
  var timeNow = Date.now();
  timeNow /= 1000;
  timeNow -= (86400 / 24) * 3;
// The Next Time variable will add 12 hours to the timeNow variable
  var nextTime = timeNow + 43200;
// The Time variable is the one that will be used in the API call, the Math.round method rounds our number to it's nearest whole number.
  var TIME = Math.round(nextTime);
// The Time Intervals will be of 12 hours
  var INTERVAL = 12;

// Places Constructor function -> will create an object for each location and add the object to an array.
  function Places (name, latitude, longitude, array){
	this.name = name;
	this.latitude = latitude;
	this.longitude = longitude;
	this.spot = {};
	this.spot.lat = latitude;
	this.spot.lng = longitude;
	array.push(this);
  }
// Button Maker function -> will create a button for every place object we please.
  function buttonMaker(place){
	var button = document.createElement('button');
	button.id = place.name;
	button.value = place.name;
	var buttonText = document.createTextNode(place.name);
	button.appendChild(buttonText);
	buttonContainer.appendChild(button);
  }  
// Make Buttons function -> calls Button Maker function in every element in a give array (we use the array where we stored our places objects).
  function makeButtons(array){
    for(var i = 0; i < array.length; i++){
      buttonMaker(array[i]);
    }
  }
// This function will called by the for loop in the futureResults func.
function loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL){
  var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "," + TIME + "?callback=?";

  function displayWeather(data){
    newResults = "<tr><td>" + "In " + INTERVAL + " hours" + "</td><td>" + data.currently.summary + "</td><td>" + data.currently.temperature + " ºF </td><td>" + data.currently.windSpeed + " mph </td><td>" + Math.round(data.currently.precipProbability * 100) + "% </td><td>" + Math.round(data.currently.humidity * 100) + "% </td><td>" + data.currently.pressure + " mb </td></tr>";
	newResultsArray.push(newResults);
	} 
}

// Create the Places array -> where we will store all of our places' objects.
var places = [];
var urca = new Places('Urca', -22.955430, -43.164800, places);
var copa = new Places('Copa', -22.9689662, -43.1844084, places);
var ipanema = new Places('Ipanema', -22.986450, -43.205995, places);
var leblon = new Places('Leblon', -22.987649, -43.221640, places);
var sanca = new Places('Sanca', -22.999373, -43.264027, places);
var joatinga = new Places('Joatinga', -23.014354, -43.290364, places);
var barra = new Places('Barra', -23.012240, -43.323770, places);
var reserva = new Places('Reserva', -23.012849, -43.388988, places);
var macumba = new Places('Macumba', -23.033037, -43.4862847, places);  
var recreio = new Places('Recreio', -23.028383, -43.464918, places);
var prainha = new Places('Prainha', -23.040962, -43.505379, places);
var grumari = new Places('Grumari', -23.048466, -43.524417, places);
var guaratiba = new Places('Guaratiba', -23.067656, -43.567932, places);

$(document).ready(function(){
  makeButtons(places);
  (function createInitialCurrentResultsTable (){
    var APIKEY = "e964d33cde30c141523b46f7f27e0007";
    var LATITUDE = -22.986450;
    var LONGITUDE = -43.205995;
    var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "?callback=?";
    function displayWeather(data){
      currentResults.innerHTML += "<th>Currently</th>";
      currentResults.innerHTML += "<td>Summary:  " + data.currently.summary + "</td>";
      currentResults.innerHTML += "<td>Temperature:  " + data.currently.temperature + " ºF </td>";
      currentResults.innerHTML += "<td>Wind Speed:  " + data.currently.windSpeed + " mpf </td>";
      currentResults.innerHTML += "<td>Chance of Rain:  " + Math.round(data.currently.precipProbability * 100) + "% </td>";
      currentResults.innerHTML += "<td>Humidity:  " + data.currently.humidity * 100 + "% </td>";
      currentResults.innerHTML += "<td>Pressure:  " + data.currently.pressure + " mb </td>";
      }
    $.getJSON(weatherAPI, displayWeather);
    resultsTable.appendChild(currentResults); 
  })();
  (function createInitialFutureResultsTable (){
    var APIKEY = "e964d33cde30c141523b46f7f27e0007";
    var LATITUDE = -22.986450;
    var LONGITUDE = -43.205995;
    var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "," + TIME + "?callback=?";
    // function loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL){    
        function displayWeather(data){
            newResults = "<tr><td>" + "In " + INTERVAL + " hours" + "</td><td>" + data.currently.summary + "</td><td>" + data.currently.temperature + " ºF </td><td>" + data.currently.windSpeed + " mph </td><td>" + Math.round(data.currently.precipProbability * 100) + "% </td><td>" + Math.round(data.currently.humidity * 100) + "% </td><td>" + data.currently.pressure + " mb </td></tr>";
            futureResults.innerHTML += newResults;     
        } 
    //};
    
    $.getJSON(weatherAPI, displayWeather);
     futureResults.innerHTML += "<th>Moment</th><th>Summary</th><th>Temperature</th><th>Wind Speed</th><th>Chance of Rain</th><th>Humidity</th><th>Pressure</th>";
    // for (var i = 1; i <= 10; i++){
    //   loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL);
    //   TIME += 43200;
    //   INTERVAL += 12; 
    // }
    resultsTable.appendChild(futureResults); 
  })()

  document.body.appendChild(container);

});

