

 /* initializing variables */
var modal = document.getElementById('wModal');
var stars = document.getElementsByClassName('fa-star');
var stats = document.getElementsByClassName('stats')[0];
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var beginTimer;
var gameStarted = 0;
var movesCount = 0;
var timeCount = 0;
var starCount = 3;
var memoryValues = [];
var memoryTileIds = [];
var cardsFlipped = 0;
//Classes of all possible card types
const cardsArray = [
     "fa-diamond",
     "fa-paper-plane-o",
     "fa-anchor",
     "fa-bolt",
     "fa-cube",
     "fa-leaf",
     "fa-bicycle",
     "fa-bomb",
     "fa-diamond",
     "fa-paper-plane-o",
     "fa-anchor",
     "fa-bolt",
     "fa-cube",
     "fa-leaf",
     "fa-bicycle",
     "fa-bomb"
 ];

 //________________________________________RUN AT START_______________________________________________//
//Create game layout
 newBoard();
// Set the .moves html content = to movesCount
document.querySelector('#resetbutton').innerHTML = '<i class="fa fa-repeat" onclick="newBoard()"></i>';
//Listen for outside click, closes pop up window
window.addEventListener('click', outsideClick);

//__________________________________________FUNCTIONS_________________________________________________//
// Creates new game layout
function newBoard() {
  //Removes the outline class from star elements to reset them for new game
  for (let x = 0; x < stars.length; x++){
    stars[x].classList.remove('outline');
  }
  //Sets move/time count = 0 and links the .moves html with movesCount var
  stopTime();
  gameStarted = 0;
  timeCount = 0;
  movesCount = 0;
  secondsLabel.innerHTML = '00';
  minutesLabel.innerHTML = '00';
  document.querySelector('.moves').innerHTML = movesCount;
  //Sets cards flipped = 0 and erases any html inside the #deck element to clear the board
  cardsFlipped = 0;
  var output = '';
  document.getElementById('deck').innerHTML = "";
  //Shuffles cardsArray then creates html element for each item in the array, then adds the html to the #deck element
  shuffle(cardsArray);
  for (let i = 0; i < cardsArray.length; i++) {
    output += '<li id="card-'+i+'" onclick="memoryFlipTile(this,\''+cardsArray[i]+'\')"></li>';
  }
  	document.getElementById('deck').innerHTML = output;
}

//__________________________________________________________________________________________________________
//Closes pop up window
function closePopup() {
  modal.classList.remove('show');
}

//__________________________________________________________________________________________________________
//Closes pop up window if user clicks outide of pop up box
function outsideClick(e) {
  if (e.target == modal) {
  modal.classList.remove('show');
  }
}

//__________________________________________________________________________________________________________
//Functions for timer
function setTime() {
  ++timeCount;
  secondsLabel.innerHTML = pad(timeCount % 60);
  minutesLabel.innerHTML = pad(parseInt(timeCount / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function stopTime() {
  clearInterval(beginTimer);
}

//__________________________________________________________________________________________________________

//Randomly shuffles an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//__________________________________________________________________________________________________________

//Flips cards over to see if matched and if game is won
function memoryFlipTile(tile,val){
  gameStarted += 1;
  //Checks if game is started, starts timer
  if (gameStarted === 1) {
    beginTimer = setInterval(setTime, 1000);
  }
  //Creates the html for the card element and styles it so it appears on screen
	if(tile.innerHTML == "" && memoryValues.length < 2){
    tile.setAttribute("style", "font-size: 33px; background: #02b3e4");
		tile.innerHTML = '<i class="back '+'fa '+val+'"></i>';
    //If no card has been selected yet
		if(memoryValues.length == 0){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
    //If there's already a card selected
		} else if(memoryValues.length == 1){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
      //Increase move count by 1
      movesCount += 1;
      document.querySelector('.moves').innerHTML = movesCount;
      //___________Star Rating System_______________
      //Gives star rating based number of moves made
      if (movesCount > 10 && movesCount <= 14) {
        stars[2].classList.add('outline');
        starCount = 2;
      }
      else if (movesCount >= 15 && movesCount <= 17) {
        stars[1].classList.add('outline');
        starCount = 1;
      }
        //__________Success Checker_________________________
      //Checks to see if cards are a match
			if(memoryValues[0] == memoryValues[1]){
				cardsFlipped += 2;
				// Clear both arrays
				memoryValues = [];
            	memoryTileIds = [];
				// Check to see if the whole board is cleared
				if(cardsFlipped == cardsArray.length){
          stopTime();
					setTimeout(function(){
            stats.innerText = "You got " + starCount + (starCount === 1? " star" : " stars") + " with " + movesCount + " moves, after " + timeCount + " seconds!";
            modal.classList.add('show');
          }, 700);
				}
			} else {
        //__________Flip Cards Back Over_______________________
				function flip2Back(){
				    // Flip the 2 card back over
				    var card1 = document.getElementById(memoryTileIds[0]);
				    var card2 = document.getElementById(memoryTileIds[1]);
				    card1.style.background = '#2e3d49';
            	    card1.innerHTML = "";
				    card2.style.background = '#2e3d49';
            	    card2.innerHTML = "";
				    // Clear both arrays
				    memoryValues = [];
            	    memoryTileIds = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
