$( document ).ready(function() {
    
	// this func is called when the HTML is loaded & ready to interact with
	
	
	// ======== becoming less temp code ========
	
	a=document.getElementById("aFrame");
	a.style.display = "none";
	
	// =========================================
	
});

aframeIsDisplayed = false;


function spread(amount) {
	var mainScene = document.querySelector('a-scene');
	var outputArea = document.getElementById('outputArea');
	
	for(i=0;i<5;i++) {
		var box = document.createElement('a-box');
		outputArea.appendChild(box);
		box.setAttribute('position', {x: 0, y: 0.5 + i*1.1, z: 0});
	}
	console.log(outputArea);
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
	aframeIsDisplayed = !aframeIsDisplayed
}
