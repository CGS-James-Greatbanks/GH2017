$( document ).ready(function() {
    
	// this func is called when the HTML is loaded & ready to interact with
	
	document.getElementById('dataDropdown').style.display = 'none';
	document.getElementById('aFrame').style.display = 'none';
	$("#loader").fadeOut();
	
});

var aframeIsDisplayed = false;
var isViewingDataOptions = false;
var selectedData = false; // not bool permanantly
var yearOptions = [];

function spread(amount, textArray) {
	//TODO: get type of object to show, and the text to show.
	var mainScene = document.querySelector('a-scene');
	var outputArea = document.querySelector('#outputArea');
	var textArea = document.querySelector("a-text");
	
	 
	var object = document.createElement("a-obj-model");
	object.setAttribute("obj-model", {obj: "#barrel"});
	object.setAttribute("material", {color: "#2b422b"});
	object.className = "object"
	
	
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
			console.log(toAdd)
	   	if (pyramid[0].length > toAdd){
				 console.log("hey")
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

function createPaths() {
	
}

function selectData(dataset, datasetName) {
	document.getElementById('dataDropdown').style.display = 'none';
	document.getElementById('dataSelectionButton').innerHTML = '&#11015';
	selectedData = dataset;
	document.getElementById('selectedDataset').innerHTML = datasetName;
	isViewingDataOptions = false;
	makeGreenBorder(200);
	
	if (selectedData == 'petrol') {
		yearOptions = [2010,2011,2012,2013,2014,2015];
	} else if (selectedData == 'vehicles') {
		yearOptions = [2012,2013,2014,2015,2016,2017];
	}
}

function makeGreenBorder(amount) {
	var element = document.getElementById('selectedDataset');
	if (amount == 255) {
		removeGreenBorder(255);
		return;
	}
	element.style.borderColor = 'rgb(0, ' + amount + ', 0)';
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


function aframe() {
	a=document.getElementById("aFrame");
	introBack=document.getElementById("introScene");
	button=document.getElementById("aframeButton")
	if (aframeIsDisplayed) {
		a.style.display = "none";
		introBack.style.display = "block";
		button.innerHTML = "activate A-Frame";
	} else {
		a.style.display = "block";
		introBack.style.display = "none";
		button.innerHTML = "deactivate A-Frame"; 
	}
	aframeIsDisplayed = !aframeIsDisplayed;
}
