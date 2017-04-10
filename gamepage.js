var currentWord = null;
function removeLoadingBar() {
	//document.getElementById("loadingbarbox").removeChild(document.getElementById("LoadingBar"));
	document.getElementById("loadingbarbox").style.display = "none";
	setTimeout(function() {
	document.getElementById("word1").style.visibility = 'visible';
	}, 100);
	setTimeout(function() {
	document.getElementById("word2").style.visibility = 'visible';
	}, 200);
	setTimeout(function() {
	document.getElementById("word3").style.visibility = 'visible';
	document.getElementById("font1").color = 'White';
	}, 300);
	setTimeout(function() {
	document.getElementById("word4").style.visibility = 'visible';
	document.getElementById("font2").color = 'White';
	}, 400);
	setTimeout(function() {
	document.getElementById("word5").style.visibility = 'visible';
	document.getElementById("font3").color = 'White';
	}, 500);
	setTimeout(function() {
	document.getElementById("word6").style.visibility = 'visible';
	document.getElementById("font4").color = 'White';
	}, 600);
	setTimeout(function() {
	document.getElementById("font5").color = 'White';
	}, 700);
	setTimeout(function() {
	document.getElementById("font6").color = 'White';
	}, 800);
}



function bringbackLoadingBar() {
	//document.getElementById("loadingbarbox").appendChild(document.getElementById("LoadingBar"));
	document.getElementById("loadingbarbox").style.display = "block";
	setTimeout(function() {
	document.getElementById("word1").style.visibility = 'hidden';
	}, 100);
	setTimeout(function() {
	document.getElementById("word2").style.visibility = 'hidden';
	}, 200);
	setTimeout(function() {
	document.getElementById("word3").style.visibility = 'hidden';
	document.getElementById("font1").color = '#4DB6AC';
	}, 300);
	setTimeout(function() {
	document.getElementById("word4").style.visibility = 'hidden';
	document.getElementById("font2").color = '#4DB6AC';
	}, 400);
	setTimeout(function() {
	document.getElementById("word5").style.visibility = 'hidden';
	document.getElementById("font3").color = '#4DB6AC';
	}, 500);
	setTimeout(function() {
	document.getElementById("word6").style.visibility = 'hidden';
	document.getElementById("font4").color = '#4DB6AC';
	}, 600);
	setTimeout(function() {
	document.getElementById("font5").color = '#4DB6AC';
	}, 700);
	setTimeout(function() {
	document.getElementById("font6").color = '#4DB6AC';
	}, 800);
}

function loadModal(){
	setTimeout(function(){
			percentageScore = 96.12;
			scoreGain = percentageScore*100
			subjectname="google"
			linktosubject="http://www.google.co.uk"
			bestanswer="Napoleon Dynamite"
			document.getElementById("bestanswer").innerHTML = "Your best answer was '".concat(bestanswer).concat("' but the actual page was <a href=").concat(linktosubject).concat(' target="_blank">').concat(currentWord.concat(".")).concat("</a>");
			document.getElementById("scoreanswer").innerHTML = "You get ".concat(scoreGain).concat(" points for your answer. (").concat(percentageScore).concat("% correct.)")
			$('#answermodal').openModal();
	}, 800);
}

function randomInteger(max) {
  return Math.round(Math.random() * (max));
}

function getSubject(){
	currentWord = wordList[randomInteger(wordList.length-1)];
	return currentWord;

}

function guessButton(){
	numguesses = numguesses+1;
	guesses.push(document.getElementById("guessBar").value);
	document.getElementById("guessBar").value = "";
	if (numguesses == 1){
		document.getElementById("guessesTable").innerHTML = guessTD1.concat(guesses[0].concat(guessTD2))
	}
	else if (numguesses == 2){
		document.getElementById("guessesTable").innerHTML = guessTD1.concat(guesses[0].concat(guessTD2.concat(guessTD1.concat(guesses[1].concat(guessTD2)))))
	}
	else{
		document.getElementById("guessesTable").innerHTML = guessTD1.concat(guesses[0].concat(guessTD2.concat(guessTD1.concat(guesses[1].concat(guessTD2.concat(guessTD1.concat(guesses[2].concat(guessTD2))))))))
		loadModal()

	}
}

//				  <p id = "bestanswer" class="ralewayfont">Your best answer was "World War 1" but the actual page was: <a href="http://www.wikipedia.org/wiki/World_War_II" target="_blank">World War II</a></p>
//				  <p id = "scoreanswer" class="ralewayfont">You get 96 points for your answer. (95.75% correct.)</p>




$(document).keyup(function (e) {
    if ($(".guessBar:focus") && (e.keyCode === 13)) {
       guessButton();
    }
 });




var guessTD1 = '<td><p style="font-size: 20px; text-align: center;" class="latofont score">';
var guessTD2 = '</p></td>';

var guesses = [];
var numguesses = 0;
wordList = ["iOS","England","Apple","Google","Microsoft","Google Maps","Tim Berners-Lee","Shia LaBeouf","Rick and Morty","Family Guy"];
var round = 1;
var totalScore = 0;

function delineate(str){
	theleft = str.indexOf("=") + 1;
	theright = str.lastIndexOf("&");
	return(str.substring(theleft, theright));
}

var numberofwords = 0;
window.onload = function() {
	var locate = window.location.toString();
	var difficulty=locate.substring(locate.indexOf("?")+1,locate.length);
	//need to make it so if there is no difficulty then you're sent back home




	if (difficulty == "easy"){
		numberofwords = 6;
	}
	else if (difficulty == "medium"){
		numberofwords = 4;
		document.getElementById("wordCont5").style.display = "none"
		document.getElementById("wordCont6").style.display = "none"
	}
	else if (difficulty == "hard"){
		numberofwords = 2;
		document.getElementById("wordCont3").style.display = "none"
		document.getElementById("wordCont4").style.display = "none"
		document.getElementById("wordCont5").style.display = "none"
		document.getElementById("wordCont6").style.display = "none"
	}
	doRound(numberofwords,getSubject());

}


function endRound(){
	document.getElementById("guessesTable").innerHTML = "";
	guesses = [];
	numguesses = 0;


	totalScore = totalScore + scoreGain
	document.getElementById("score").innerHTML = totalScore;

	document.getElementById("round").innerHTML = parseInt(document.getElementById("round").innerHTML)+1;
	bringbackLoadingBar();
	console.log("LOAD NEW WORDS")
	doRound(numberofwords,getSubject());

}
var scoreGain = 0;
function doRound(numberofwords,wikitopic){
	console.log(wikitopic);
	var urlPart1 = "https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&redirects&exintro=&origin=*&explaintext=&titles="
	var wikitopicWspace = wikitopic.concat(" "); //Provides the wikitopic with a space after to make it work when removed in filter
	var url = urlPart1.concat(wikitopic)
	var xhttp = new XMLHttpRequest(wikitopicWspace);
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			 var wikiText = JSON.parse(this.responseText);
			 var CommonWords=(getFrequency2(wikiText.query.pages[0].extract, 30,wikitopicWspace)).split(",");
			 applytochips(numberofwords,CommonWords);
			 removeLoadingBar();
			}
	  };
	  xhttp.open("GET", url, true);
	  xhttp.send();
}

	function getFrequency2(string, cutOff, topic) {
	var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]|the |such |which |known |also |under |of |are |and |to |a |an |at |in |is |many |i |that |it |for |you |was |with |on |be |have |but |be |they |as |its |= |january |february |march |april |may |june |july |august |september |october |november |december |by |he |she |by |from |her |him |or |can |most /gi,'');
	var re = new RegExp(topic, "gi"); //Setting up the topic as a word to be romoved by the filter
	var cleanStringP2 = cleanString.replace(re,'')
	var words = cleanStringP2.split(/\s/), frequencies = {}, word, frequency, i;

  for( i=0; i<words.length; i++ ) {
    word = words[i];
    frequencies[word] = frequencies[word] || 0;
    frequencies[word]++;
  }

  words = Object.keys( frequencies );

  return words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,cutOff).toString();
}
	function applytochips(numberofwords,CommonWords){
	for (j=0;j<numberofwords;j++){
		document.getElementById("font".concat(j+1)).innerHTML=CommonWords[j];
	}
}
