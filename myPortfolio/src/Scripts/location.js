function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayPosition);
	} else {
		myLocation.innerHTML = "Not Available";
	}
}

function displayPosition(position) {
	var myLocation = document.getElementById("coordinates");
	myLocation.innerHTML =
		"Longitude:" +
		position.coords.longitude +
		" <br> Latitude:" +
		position.coords.latitude;
}
