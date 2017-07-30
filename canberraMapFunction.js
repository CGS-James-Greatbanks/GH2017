//Canberra map functions:
var regions = ["northCanberra", "southCanberra", "woden", "belconnen", "westonCreek", "Tuggeranong", "Gungahlin"];
var regionCoords = [{x: 0, y: 0, z: -1}, {x: 0, y: 0, z: 0}, {x: -1, y: 0, z: 0}, {x: -1, y: 0, z: -1.2}, {x: -1.5, y: 0, z: 0}, {x: 0, y: 0, z: 2}, {x: 0, y: 0, z: -2}]
var regionObjects = []

function mapLight(dataType, value) {
	
}






function createMap() {
	var mapArea = document.querySelector('#mapArea');
	for (var i=0;i<regions.length;i++) {
		var mapRegion = document.createElement("a-box");
		mapRegion.setAttribute("material", {color: "#42f450"});
		mapRegion.setAttribute("position", regionCoords[i]);
		mapRegion.id = regions[i];
		mapRegion.className = "object";
		mapArea.appendChild(mapRegion);
	}
}

