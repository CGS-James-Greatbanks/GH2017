//Canberra map functions:
var regions = ["northCanberra", "southCanberra", "woden", "belconnen", "westonCreek", "Tuggeranong", "Gungahlin"];
var regionCoords = [{x: 0, y: 0, z: }, ]
var regionObjects = []
var mapArea = document.querySelector('#mapArea')

function mapLight(dataType, value) {
	
}

function createMap() {
	for (var i=0;i<regions.length;i++) {
		var mapRegion = document.createElement("a-box");
		mapRegion.setAttribute("material": {color: "#fe1f1f"});
	}
}

