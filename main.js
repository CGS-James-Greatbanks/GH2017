// Global variable storage

var aframeIsDisplayed = false;
var isViewingDataOptions = false;
var selectedData = false; // not bool permanantly
var yearOptions = [];
var categories = [];



// Window onload

$(window).on("load", function() {
    // jQuery window onload function
	
	
	// hide dropdown menu programatically
	document.getElementById('dataDropdown').style.display = 'none';
	
	// hide the aframe div and all of it's assets
	document.getElementById('aFrame').style.display = 'none';
	
	// fade out the loader div
	$("#loader").fadeOut();
	
	// if the device is not a mobile or is landscape
	if (screen.width > 736 || screen.width > screen.height) {
		
		// bring the mainIntro div forward
		document.getElementById('mainIntro').style.zIndex = '10';
		
		// begin the slide in animation
		document.getElementById('mainIntro').style.animationName = 'slideIn';
	}
});




// create event for resize of media screen (mobile orientation change) detection
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
	// code to be executed on resize
	
	// if is phone and is landscape
    if (screen.height <= 736 && screen.width > screen.height) {
		// show the mainIntro div
		document.getElementById('mainIntro').style.zIndex = '10';
	}
	
	// if is phone and is portrait
	if (screen.height <= 736 && screen.height > screen.width) {
		// hide the mainIntro div
		document.getElementById('mainIntro').style.zIndex = '-1';
	}
}, false);




function changeDataset() {
	if (isViewingDataOptions) {
		document.getElementById('dataDropdown').style.display = 'none';
		document.getElementById('dataSelectionButton').innerHTML = '&#11015';
	} else {
		document.getElementById('dataDropdown').style.display = 'inline-block';
		document.getElementById('dataSelectionButton').innerHTML = '&bull;';
	}
	
	isViewingDataOptions = !isViewingDataOptions;
}

function selectData(dataset, datasetName) {
	document.getElementById('year').innerHTML = '<option value="null">select year</option>';
	document.getElementById('categories').innerHTML = '<option value="null">select category</option>';
	document.getElementById('dataDropdown').style.display = 'none';
	document.getElementById('dataSelectionButton').innerHTML = '&#11015';
	selectedData = dataset;
	document.getElementById('selectedDataset').innerHTML = datasetName;
	isViewingDataOptions = false;
	makeGreenBorder(200);
	
	if (selectedData == 'petrol') {
		yearOptions = [2010,2011,2012,2013,2014,2015];
		categories = ["per-person", "per 100 people"];
	} else if (selectedData == 'budget') {
		yearOptions = [2018,2019,2020,2021];
		categories = ["overall", "support", "services", "jobs", "construction", "care", "schools"];
	}
	
	for (var i = 0; i < yearOptions.length; i++) {
		var year = yearOptions[i];
		var select = document.getElementById('year');
		select.innerHTML += '<option value="' + year + '">' + year+ '</option>';
	}
	
	for (var i = 0; i < categories.length; i++) {
		var category = categories[i];
		var select = document.getElementById('categories');
		select.innerHTML += '<option value="' + category + '">' + category+ '</option>';
	}
}

//Tell you if selected
function collateData() {
	var category = document.getElementById('categories').value;
	var year = document.getElementById('year').value;
	if (category == 'null' || year == 'null') {
		document.getElementById('beginButton').style.display = "none";
		return;
	}
	document.getElementById('beginButton').style.display = "block";
}

function dataButtonPress() {
	var category = document.getElementById('categories').value;
	if (category == 'per-person') {
		category = 0;
	} else if (category == 'per 100 people') {
		category = 1;
	}
	var year = document.getElementById('year').value;
	
	// ================================== CALLING OF THE SHOWMETHEDATA FUNC =================================== /
	determineOutputMethod(year, category)
}

function determineOutputMethod(year, category) {
	if (selectedData == "petrol") {
		showMeTheData(selectedData, year, category);
	} else {
		
		 handleBudget(year, category);
	}
}

function showMeTheData(data, year, category) {
	
	 aframe();
	 removeObjects();
	
	 year = parseInt(year);
	 
	 var dataString = returnData(data);
	 var split = dataString.split("\n");
	 split.shift()
	 var dataDict = {};
	 for(var i = 0; i < split.length; i++){
		  var theString = split[i].split(",");
		  dataDict[theString[0]] = theString[1];
	 }
	 
	 var amount = dataDict[year];
	 var populationDataDict = {};
	 var popDataString = returnData("pop");
	 var popSplit = popDataString.split("\n");
	 popSplit.shift();
	 for (var i = 0; i < popSplit.length; i++) {
		  var theString = popSplit[i].split(",");
		  populationDataDict[theString[0]] = theString[1];
	 }
	 
	 
	 //Works with drop down menu
	 if (category == 0 && data == "petrol"){
		  //perperson
		  amount = parseInt(amount / 159);
		  amount = parseInt(amount / populationDataDict[year]);
		  
		  
		  startAnimBarrel(amount, ["This is an oil barrel", "You use this many barrels every year"])
	 }
	 
	 else if (category == 1 && data == "petrol"){
		  amount = parseInt(amount / 159);
		  amount = parseInt((amount / populationDataDict[year]) * 100);
		  
		  startAnimBarrel(amount, ["This is an oil barrel", "Every year, 100 people use this much oil (" + amount.toString() + " barrels)."]);
	 }
	 
}

function makeGreenBorder(amount) {
	var element = document.getElementById('selectedDataset');
	if (amount == 255) {
		removeGreenBorder(255);
		return;
	}
	element.style.borderColor = 'rgb(0, ' + amount + ', 0);'+
	amount++;
	setTimeout(function() {
		makeGreenBorder(amount);
	},1);
}

function removeGreenBorder(amount) {
	var element = document.getElementById('selectedDataset');
	if (amount == 0) {
		return;
	}
	element.style.borderColor = 'rgb(0, ' + amount + ', 0)';
	amount--;
	setTimeout(function() {
		removeGreenBorder(amount);
	},1);
}

//Handle budget data

function handleBudget(year, category) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "data/state/financial-by-year/" + year.toString() + ".csv", false);
	xmlHttp.send(null);
	budgetSplitByLine(xmlHttp.responseText, category);
}

function budgetSplitByLine(responseText, category) {
	var split = responseText.split("\n");
	var budgetDict = {};
	for (var i = 0; i < split.length; i++){
		 var xtraSplit = split[i].split(",");
		 budgetDict[xtraSplit[0]] = xtraSplit[1]
	}
	
	 if (category == "overall"){
		  category = "total";
	 }
	 
	var amount = budgetDict[category]
	
	console.log(amount);
	
	amount /= 650000;
	
	startAnimHouses(amount, ["One standard house is worth $650,000.", "This is how many houses you can buy with the " + category + " budget (" + parseInt(amount).toString() + " houses)."])
	 
	 
}


function startAnimHouses(amount, textArray) {
	 
	aframe();
	removeObjects();
	 
	var outputArea = document.querySelector('#outputArea');
	var textArea = document.querySelector("a-text");
   
	var object = document.createElement("a-plane");
	object.setAttribute("material", {color: "#edb350"});
	object.setAttribute("position", {x: 0, y: 0.005, z: -97});
	object.setAttribute("rotation", {x: -90, y: 0, z: 0});
	object.setAttribute("geometry", {width: 2.5, height: 200});
	object.className = "object";
	outputArea.appendChild(object);
	 
	textArea.setAttribute("text", {value: textArray[0]})
	textArray.shift()

	setTimeout(function() {houseUpdate(amount, textArray)}, 3000);
}

function houseUpdate(amount, textArray){
	 var textArea = document.querySelector("a-text");
	 textArea.setAttribute("text", {value: textArray[0]});
	 if(textArray.length > 1){
		  textArray.shift()
		  setTimeout(function() {houseUpdate(amount, textArray)}, 3000);
	 } else {
		  houseSpread(amount);
	 }
	 
}


function houseSpread(amount) {
	 
	 console.log(amount)
	var mainScene = document.querySelector('a-scene');
	var outputArea = document.querySelector('#outputArea');
	var halfOfHouse = parseInt(amount/2);
	var halfOfHouse2 = Math.ceil(amount/2);
	 
	for(var i = 0; i < halfOfHouse; i++){
		 var object = document.createElement("a-obj-model");
		 object.setAttribute("obj-model", {obj: "#house"});
		 object.setAttribute("material", {color: "#b3ff9e"});
		 object.setAttribute("position", {x: -4, y: 0, z: -4.5*i});
		 object.setAttribute("rotation", {x: 0, y: -90, z: 0})
		 object.setAttribute("scale", {x: 2, y: 2, z: 2});
		 outputArea.appendChild(object);
	}
	 
	for(var i = 0; i < halfOfHouse2; i++){
		 var object = document.createElement("a-obj-model");
		 object.setAttribute("obj-model", {obj: "#house"});
		 object.setAttribute("material", {color: "#b3ff9e"});
		 object.setAttribute("position", {x: 4, y: 0, z: -4.5*i});
		 object.setAttribute("rotation", {x: 0, y: 90, z: 0})
		 object.setAttribute("scale", {x: 2, y: 2, z: 2});
		 outputArea.appendChild(object);
	}
	 
	 
}




// Function to remove all objects from A-Frame
function removeObjects(){
	 var objects = document.querySelectorAll(".object");
	 var outputArea = document.querySelector('#outputArea');
	 for(var i = 0; i < objects.length; i++){
		  outputArea.removeChild(objects[i]);
	 }
}



//Fetchs data from csv file
function returnData(data){
	 if (data == "petrol"){
		  var xmlHttp = new XMLHttpRequest();
    		xmlHttp.open( "GET", "data/national/petroleum_products_per_year.csv", false );
    		xmlHttp.send( null );
    		return xmlHttp.responseText;
	 	} else if (data == "vehicles") {
		  var xmlHttp = new XMLHttpRequest();
    		xmlHttp.open( "GET", "data/national/vehicles_census_data.csv", false );
    		xmlHttp.send( null );
    		return xmlHttp.responseText;
	 } else if (data == "pop") {
		  var xmlHttp = new XMLHttpRequest();
    		xmlHttp.open( "GET", "data/national/historical_population_data_national.csv", false);
    		xmlHttp.send( null );
    		return xmlHttp.responseText;
	 }
}





function startAnimBarrel(amount, textArray) {
	var outputArea = document.querySelector('#outputArea');
	var textArea = document.querySelector("a-text");
   
	var object = document.createElement("a-obj-model");
	object.setAttribute("obj-model", {obj: "#barrel"});
	object.setAttribute("material", {color: "#2b422b"});
	object.setAttribute("position", {x: 0, y: 0, z: 1});
	object.className = "object";
	outputArea.appendChild(object);
	textArea.setAttribute("text", {value: textArray[0]});
	textArray.shift()
	console.log(textArray);
	setTimeout(function() {updateText(amount, textArray)}, 3000);
}

function updateText(amount, textArray) {
	 
	 var textArea = document.querySelector("a-text");
	 console.log(textArray);
	 textArea.setAttribute("text", {value: textArray[0]});
	 if(textArray.length > 1){
		  textArray.shift()
		  setTimeout(function() {updateext(amount, textArray)}, 3000);
	 } else {
		  spread(amount);
	 }
	 
}

function spread(amount){
	//TODO: get type of object to show, and the text to show.
	var mainScene = document.querySelector('a-scene');
	var outputArea = document.querySelector('#outputArea');
	
	
	//TODO: move output area depending on what kind of data
	
	var pyramid = [];
	var currentRowLen = 1;
	var rowCounter = 0;
	for (var i = 0; i < amount; i++) {
		 
		 if (rowCounter == 0) {
			  pyramid.push([]);
		 }
		 var object = document.createElement("a-obj-model");
		 object.setAttribute("obj-model", {obj: "#barrel"});
		 object.setAttribute("material", {color: "#2b422b"});
		 pyramid[pyramid.length-1].push(object);
		 rowCounter++;
		 if (rowCounter == currentRowLen) {
			  rowCounter = 0;
			  currentRowLen++;
		 }
		 
		 
	}
	 
	if (pyramid[pyramid.length - 1].length <= pyramid[pyramid.length-2].length){
		var botLength = pyramid[pyramid.length - 1].length
		var secondLength = pyramid[pyramid.length - 2].length
		var toAdd = secondLength-botLength + 1;
		for (var i = 0; i < secondLength-botLength + 1; i++){
	   	if (pyramid[0].length > toAdd){
				pyramid[0].shift()
			} else {
				var toMinus = pyramid[0].length
			 	pyramid.shift()
			 	i += toMinus - 1;
				toAdd -= toMinus;
			}
			 
		}
		
		for (var i = 0; i < secondLength-botLength + 1; i++){
			var object = document.createElement("a-obj-model");
			object.setAttribute("obj-model", {obj: "#barrel"});
			object.setAttribute("material", {color: "#2b422b"});
			pyramid[pyramid.length - 1].push(object);
		}
		
		
		
	}

	var y = 0;
	for (var i = pyramid.length-1; i >= 0; i--) {
		 var currentRow = pyramid[i];
		 var halfLength = (currentRow.length*0.65)/2
		 for (var j = 0; j < currentRow.length; j++) {
			  var currentObj = currentRow[j];
			  currentObj.setAttribute('position', {x: j*0.65-halfLength+(0.325), y: y*0.91, z: 0});
			  currentObj.className = "object";
			  outputArea.appendChild(currentObj);
			  
			  
		 }
		 y++;
	}

}

function aframe() {
	a=document.getElementById("aFrame");
	introBack=document.getElementById("introScene");
	//button=document.getElementById("aframeButton")
	if (aframeIsDisplayed) {
		a.style.display = "none";
		introBack.style.display = "block";
		//button.innerHTML = "activate A-Frame";
	} else {
		a.style.display = "block";
		introBack.style.display = "none";
		//button.innerHTML = "deactivate A-Frame"; 
	}
	aframeIsDisplayed = !aframeIsDisplayed;
}

