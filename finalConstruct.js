
	// Declared Funtions
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
		topbar.appendChild(button);
	  }
	   // Make Buttons function -> calls Button Maker function in every element in a give array (we use the array where we stored our places objects).
	  function makeButtons(array){
		for(var i = 0; i < array.length; i++){
			buttonMaker(array[i]);
		}
	  }

	  // Declared Variables
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
	  var logo = document.createElement("h1")
	  logo.id = "logo";
	  logo.innerHTML = "Rio ";
	  logo.appendChild(logoImg);
	  logo.innerHTML += " Spots";
	  logoDiv.appendChild(logo);

	  // A topbar div -> holds our buttons, search bar and logo.
	  var topbar = document.createElement('div');
	  topbar.id = 'topbar';
	  topbar.style.backgroundColor = "#00ff48";
	  topbar.style.height = "25px";
	  topbar.style.float = "bottom";
	  topbar.style.padding = "0";
	  topbar.style.float = "left";
	  container.appendChild(topbar);
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
	  var results = document.createElement("table");
	  results.id = "results";
	  results.style.float = "left";
	  resultsTable.appendChild(results);
	  // A Future Results div -> holds results for the future moments.
	  var futureResults = document.createElement("table");
	  futureResults.id = "futureResults";
	  // A Footer div -> to finish out our website.
	   var footerDiv = document.createElement('div');
	  footerDiv.id = "footerDiv";
	  container.appendChild(footerDiv);	  
	  // Create an array to hold all of our Google Maps Markers.
	  var markers = [];
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

	  // Wiring Things Together
	   // A jQuery function -> when document has loaded this function runs.
	  $(document).ready(function(){
		// Here we call the Make Buttons function giving it our Places array. 
		makeButtons(places);

		(function createInitialTable (){
			// Next, we declare all the variables we'll need for the API call
			// 	- The API key, Latitude and Longitude are necessary for the API's URL.
			var APIKEY = "e964d33cde30c141523b46f7f27e0007";
			var LATITUDE = -22.986450;
			var LONGITUDE = -43.205995;
			// Here we generate a simple title.
		//	container.innerHTML += '<h2 align="center">' + "Rio de Janeiro"+ "</h2>";
			// Here we declare our API's variable -> it is simply a string holding the API's url and our variables are concatenated into it. 
			var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "?callback=?";
			// Finally, we have our callback function -> it takes in our data (JSON data that gets returned from the API request) and displays it to our webpage as a table.
			function displayWeather(data){
				results.innerHTML += "<th>Currently</th>";
				results.innerHTML += "<td>Summary:  " + data.currently.summary + "</td>";
				results.innerHTML += "<td>Temperature:  " + data.currently.temperature + " ºF </td>";
				results.innerHTML += "<td>Wind Speed:  " + data.currently.windSpeed + " mpf </td>";
				results.innerHTML += "<td>Chance of Rain:  " + Math.round(data.currently.precipProbability * 100) + "% </td>";
				results.innerHTML += "<td>Humidity:  " + data.currently.humidity * 100 + "% </td>";
				results.innerHTML += "<td>Pressure:  " + data.currently.pressure + " mb </td>";
			}	
			// Lastly, our jQuery .getJSON method manages our API request taking in our URL and callback function.
			$.getJSON(weatherAPI, displayWeather);	
			// Add our Results div to our Container div and effectively	display our results.
			resultsTable.appendChild(results);
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

				futureResults.innerHTML += "<th>Moment</th><th>Summary</th><th>Temperature</th><th>Wind Speed</th><th>Chance of Rain</th><th>Humidity</th><th>Pressure</th>";
				// Lastly, we have a for loop that will print our results for the next 10 12-hour intervals.
				for (var i = 1; i <= 10; i++){
					loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL);
					TIME += 43200;
					INTERVAL += 12;	

				}

				// This function will called by the for loop in the futureResults func.
			function loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL){
					var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "," + TIME + "?callback=?";
		
					function displayWeather(data){
							
							futureResults.innerHTML += "<td>" + "In " + INTERVAL + " hours" + "</td><td>" + data.currently.summary + "</td><td>" + data.currently.temperature + " ºF </td><td>" + data.currently.windSpeed + " mph </td><td>" + Math.round(data.currently.precipProbability * 100) + "% </td><td>" + Math.round(data.currently.humidity * 100) + "% </td><td>" + data.currently.pressure + " mb </td>";
							futureResults.innerHTML += "</tr>";
							} 

				$.getJSON(weatherAPI, displayWeather);	
						
				resultsTable.appendChild(futureResults);	
			}
			
		})();
		
		// Another jQuery function -> when any button is clicked a table is created and the CURRENT weather conditions are displayed:
		// - This is our API call to receive our current results.
		$("body").on('click', 'button', function resultsFunc(){
			// This function will be called to display the results of the future moments.
			function loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL, TITLE){
				var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "," + TIME + "?callback=?";
				function displayWeather(data){
						futureResults.innerHTML += "<td>" + "In " + INTERVAL + " hours" + "</td><td>" + data.currently.summary + "</td><td>" + data.currently.temperature + " ºF </td><td>" + data.currently.windSpeed + " mph </td><td>" + Math.round(data.currently.precipProbability * 100) + "% </td><td>" + Math.round(data.currently.humidity * 100) + "% </td><td>" + data.currently.pressure + " mb </td>";
						futureResults.innerHTML += "</tr>";
						} 

				$.getJSON(weatherAPI, displayWeather);	
						
				resultsTable.appendChild(futureResults);	
			}
			// First we clear our Results div -> so that when we call it a second time, our first results disappear.
			// resultsContainer.innerHTML = " ";

			results.innerHTML = " ";
			futureResults.innerHTML = " ";
			// Next, we declare all the variables we'll need for the API call
			// 	- The API key, Latitude and Longitude are necessary for the API's URL.
			var APIKEY = "e964d33cde30c141523b46f7f27e0007";
			var LATITUDE;
			var LONGITUDE;
			//  - The Button Value variable will get (via jQuery) the text for each button and will ube used as the title for our results.
			var btnValue = $(this).text();
			// This 'for' loop will go over the places array and check if our Button's text value matches any of our places' names. If so it will set our Latitude and Longitude varibles as the Latitude and Longitude of the matched object.
			for(var i = 0; i < places.length; i++){
				if(btnValue == places[i]["name"]){
					LATITUDE = places[i]["latitude"];
					LONGITUDE = places[i]["longitude"];
				}		
			}
			// Here we declare our API's variable -> it is simply a string holding the API's url and our variables are concatenated into it. 
			var weatherAPI = "https://api.forecast.io/forecast/" + APIKEY + "/" + LATITUDE + "," + LONGITUDE + "?callback=?";
			// Finally, we have our callback function -> it takes in our data (JSON data that gets returned from the API request) and displays it to our webpage as a table.
			function displayWeather(data){
				title.innerHTML = btnValue;
				results.innerHTML += "<th>Currently</th>";
				results.innerHTML += "<td>Summary:  " + data.currently.summary + "</td>";
				results.innerHTML += "<td>Temperature:  " + data.currently.temperature + " ºF </td>";
				results.innerHTML += "<td>Wind Speed:  " + data.currently.windSpeed + " mpf </td>";
				results.innerHTML += "<td>Chance of Rain:  " + data.currently.precipProbability * 100 + "% </td>";
				results.innerHTML += "<td>Humidity:  " + data.currently.humidity * 100 + "% </td>";
				results.innerHTML += "<td>Pressure:  " + data.currently.pressure + " mb </td>";

			}	
			// Lastly, our jQuery .getJSON method manages our API request taking in our URL and callback function.
			$.getJSON(weatherAPI, displayWeather);	
			// Add our Results div to our Container div and effectively	display our results.
			resultsTable.appendChild(results);

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
				var TITLE = btnValue;

				futureResults.innerHTML += "<th>Moment</th><th>Summary</th><th>Temperature</th><th>Wind Speed</th><th>Chance of Rain</th><th>Humidity</th><th>Pressure</th>";
				// Lastly, we have a for loop that will print our results for the next 10 12-hour intervals.
				for (var i = 1; i <= 10; i++){
					loopFutureResults(APIKEY, LATITUDE, LONGITUDE, TIME, INTERVAL, TITLE);
					TIME += 43200;
					INTERVAL += 12;	

				}

			
			});
			
   		document.body.appendChild(container);
  	  });
		
	