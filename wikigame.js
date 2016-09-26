function easyMode() {
	document.getElementById("difficultyRatingLabel").innerHTML = "A good starting point.";
	difficulty = "easy";
}
function medMode() {
	document.getElementById("difficultyRatingLabel").innerHTML = "If you want to be average.";
	difficulty = "medium";
}
function hardMode() {
	document.getElementById("difficultyRatingLabel").innerHTML = "Whoa there, Sherlock!";
	difficulty = "hard";
}
function playgame() {
	document.location.href="gamepage.html?".concat(difficulty);
}

var difficulty="easy";

