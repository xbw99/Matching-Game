/*
 * Create a list that holds all of your cards
 */
const listOfCard = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
                  "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-bolt", "fa fa-cube",
                  "fa fa-cube", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf",
                  "fa fa-leaf", "fa fa-bomb", "fa fa-bomb", "fa fa-bicycle",
                  "fa fa-bicycle"];

/* open holds selected cards:
  if cards match, they will be stored in open;
  if cards don't match, they will be removed from open;*/
let open = [];

/*step records the moves the player has uesd*/
let step = 0;
let watch = new stopWatch($("#time") );

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*restart shuffle cards, clear open array and step*/
function restart(){
  open = [];
  var shuffleCard = shuffle(listOfCard);
  var i = 0;
  $(".card").each(function(){
    $(this).children().attr("class", shuffleCard[i]);
    i ++;
  })
  $(".fa.fa-star-o").attr("class","fa fa-star");
  stars = 3;
  $(".card").attr("class", "card");
  step = 0;
  countStep();
  watch.reset();
  watch.start();
}

/*display show the cards selected by the player*/
function display(card){
  card.addClass("open");
}

/*add selected cards' names to open array*/
function addToOpen(card){
  open.unshift(card.children().attr("class"));
}

/*check whether cards match and add animation to the corresponding cards*/
function match(openCard){
  if(openCard[0]===openCard[1]){
    $(".show").toggleClass("show match animated rubberBand");
  }
  else{
    $(".show").toggleClass("show noMatch animated wobble");
    setTimeout(function(){
      $(".noMatch").toggleClass("noMatch open animated wobble");
    },1000)
    open.splice(0,2);
  }
}

/*count the moves the player has used in the game*/
function countStep(){
  $(".moves").text(step===1?(step+" Move"):(step+" Moves"));
  if(step == 13){
    $(".fa.fa-star").first().attr("class","fa fa-star-o");
  }
  else if (step == 17) {
    $(".fa.fa-star").first().attr("class","fa fa-star-o");
  }
}

/*stopWatch function records time*/
function stopWatch(clock){
  var time = 0;
  var interval;
  var offset;

  function update(){
    if(this.isOn){
      time += delta();
    }
    var formatterTime = timeFormatter(time);
    clock.text(formatterTime);
  }

  function delta(){
    var now = Date.now();
    var timePassed = now-offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(milliseconds){
    var time = new Date(milliseconds);
    var seconds = time.getSeconds().toString();
    var minutes = time.getMinutes().toString();

    if(seconds.length < 2){
      seconds = "0" + seconds;
    }

    if(minutes.length < 2){
      minutes = "0" + minutes;
    }

    return minutes + " : " + seconds;
  }

  this.isOn = false;

  this.start = function(){
    if(!this.isOn){
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      this.isOn = true;
    }
  };

  this.stop = function(){
    if(this.isOn){
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };

  this.reset = function(){
    time = 0;
    update();
  };

}

/*all functions associated with event 'click'*/
function clicks(){
  $(".restart").click(function(){
    restart();
  })

  $(".card").click(function(){
    if($(this).attr("class")==="card" && $(".noMatch").length !=2){
      display($(this));
      addToOpen($(this));
      $(this).addClass("show");
      if(open.length%2 === 0){
        match(open);
        step += 1;
        countStep();
      }
      endGame();
    }
  })

  $(".close").click(function(){
    $("#myModal").css("display", "none");
  })

  $("body").click(function(event){
    var target = $(event.target);
    if(target.is($("#myModal"))){
      $("#myModal").css("display", "none");
    }
  })

  $("button").click(function(){
    $("#myModal").css("display", "none");
    restart();
  })
}

/*check whether all cards are matched and show the Congradulation page*/
function endGame(){
  if($(".match").length === 16){
    $("#myModal").css("display", "block");
    watch.stop();
  };
  $("#totoalMoves").text(step);
  var star = $(".stars").html();
  $("#rating").html(star);
  var time = $("#time").text();
  $("#finalTime").text(time);
}

/*initialize the start page*/
function initialize(){
  for(i=0; i<listOfCard.length;i++){
    var newLi = $("<li/>").addClass("card");
    var newI = $("<i/>").addClass(listOfCard[i]);
    $(".deck").append(newLi);
    newLi.append(newI);
  }

  var numberOfStars = 3;
  for(i=0;i< numberOfStars;i++){
    var starInitLi = $("<li/>");
    var starInitI = $("<i/>").addClass("fa fa-star");
    $(".stars").append(starInitLi);
    starInitLi.append(starInitI);
  }

}
/* start game*/
function startGame(){
  initialize();
  restart();
  clicks();
}

startGame();






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
