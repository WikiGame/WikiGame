function removeLoadingBar() {
	document.getElementById("LoadingBar").remove();
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

function delineate(str){
	theleft = str.indexOf("=") + 1;
	theright = str.lastIndexOf("&");
	return(str.substring(theleft, theright));
}

function beginGame(){ // MAIN GAME CODE
var urlPart1 = "https://crossorigin.me/http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="
var wikitopic = "iOS"
var wikitopicWspace = wikitopic.concat(" "); //Provides the wikitopic with a space after to make it work when removed in filter
var url = urlPart1.concat(wikitopic)
var xhttp = new XMLHttpRequest(wikitopicWspace);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		 var CommonWords=(getFrequency2(this.responseText, 30,wikitopicWspace)).split(",");
		 document.getElementById("font1").innerHTML=CommonWords[0]
		 document.getElementById("font2").innerHTML=CommonWords[1]
		 document.getElementById("font3").innerHTML=CommonWords[2]
		 document.getElementById("font4").innerHTML=CommonWords[3]
		 document.getElementById("font5").innerHTML=CommonWords[4]
		 document.getElementById("font6").innerHTML=CommonWords[5]
		 removeLoadingBar()

    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

	function getFrequency2(string, cutOff, topic) {
	var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]|the |of |are |and |to |a |in |is |many |i |that |it |for |you |was |with |on |be |have |but |be |they |as |its |= |january |february |march |april |may |june |july |august |september |october |november |december |by |he |she |by |from |her |him |or |can |most /gi,'');
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

window.onload = function() {
	beginGame();
	var locate = window.location.toString();
	var difficulty=locate.substring(locate.indexOf("?")+1,locate.length);
};

 $(document).ready(function(){
	$('.modal-trigger').leanModal();
});
