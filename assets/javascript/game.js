
// //function cardMovement() {
//  $(".playerCard").on("click",function(){
//  	$(".attackSec").append($(this));
//  	$(this).attr("class", "attackCard");  //the clicked cards class is now switched from playerCard to attackCard 
//  	$(".playerCard").attr("class", "opForCard") //changing the class of the rest of the playerCards ot opForCard
//  	$(".defenderChoice").append($(".playerChoice").children()); //adds remainder of cards to defenderChoice div
//  	//$(".playerChoice").attr("class", "emptyPlayerChoice");  //playerChoice div is now emptyPlayerChoice//commented out to try code without changing class name
//  	$(".playerChoice").html("<p>Now pick your opponent. Choose carefully!</p>");
//  	console.log(this);
//  });
// //}
// //cardMovement();  //This wouldn't work cause the .playerCard class is bound from the beginning. Static event handlers vs delegated event handler. Could have used off() to handle the situation as well.
var x = "";
var y = "";
var click = 0;
var numWins = 0;
var opReady = false; //returns true when there is an opponent to attack
var resetBoo = false; // returns true when there is a reset button present
var reset = "";       //var for reset button

//assigning value to id of cards
$("#darthMaul").data("stats", {currentHP: 120, charAP: 12, currentMultiplyer: 1, playerName: "Darth Maul"});
$("#sepDroid").data("stats", {currentHP: 100, charAP: 15, currentMultiplyer: 1, playerName: "Separatist Droids"});
$("#obWan").data("stats", {currentHP: 150, charAP: 11, currentMultiplyer: 1, playerName: "Obi-Wan Kenobi"});
$("#quiGon").data("stats", {currentHP: 180, charAP: 9, currentMultiplyer: 1, playerName: "Qui-Gon Jinn"});
//console.log($("#darthMaul").data("stats").currentHP);


//card movement
function cardMovement(){
$(".playerChoice").on("click", ".playerCard", function(){
 	x = this;
 	$(".attackSec").append($(this));
 	$(this).attr("class", "attackCard");  //the clicked cards class is now switched from playerCard to attackCard 
 	$(".playerCard").attr("class", "opForCard"); //changing the class of the rest of the playerCards ot opForCard
 	$(".defenderChoice").append($(".playerChoice").children()); //adds remainder of cards to defenderChoice div
 	$(".playerChoice").height("2%");
 	$(".playerChoice").html("<p>Now pick your opponent. Choose carefully!</p>");
 	$("p:first").addClass("css-typing");
 	//console.log(this);
 	//console.log(x);
 	return x;
 });
}

function defenseMovement(){
	
	$(".defenderChoice").on("click", ".opForCard", function(){
	 	while(click < 1){ 
	  	y = this;
	  	$(".defenderSec").append($(this));     //clicked card moves to defenderSec div
	  	$(this).attr("class", "currentOpFor"); // reclassified as currentOpFor
	  	$(".playerChoice").html("<p>Press the Attack button to fight your opponent!</p>"); //updates directions up top
	  	$("p:first").addClass("css-typing");
	  	opReady = true;
	  	click++;
	  	}
		return y;
   });
}
	

 cardMovement();
 defenseMovement();
 
 $("#attackButt").on("click", function(){
   if ($(x).data("stats").currentHP > 0 && opReady == true) {	
	
	   $(x).data("stats").currentHP -= $(y).data("stats").charAP; //removes player hp
	   $(y).data("stats").currentHP -= ($(x).data("stats").charAP * $(x).data("stats").currentMultiplyer);  //removes enemy hp (ap * multiplyer)
	   $(x).children("p").html($(x).data("stats").currentHP);     //updates player card with current hp
	   $(y).children("p").html($(y).data("stats").currentHP);     //updates enemy card  with current hp
	   $(".playerChoice").children("p").html("You attacked " + $(y).data("stats").playerName + " for " + $(x).data("stats").charAP * $(x).data("stats").currentMultiplyer + " damage. Your damage is now multiplyed by " + $(x).data("stats").currentMultiplyer + "!");
	   $("p:first").addClass("css-typing");
	   $(x).data("stats").currentMultiplyer++;  				   //increases multiplyer
	   //console.log($(x).data("stats").currentHP);
	   

	  if ($(y).data("stats").currentHP <= 0){   //hides opponent card if hp goes below zero also logs win
     	   $(y).hide();
     	   click = 0;
     	   numWins++;
     	   //console.log(numWins);
     	   if(numWins == 3){ //win scenario reset button is created to start over
   		      opReady = false;
   		      click++;
   		      $(".playerChoice").children("p").html("You have defeted all opponents! Click reset to try again.");
   		      resetButt();
     	   
     	   }else{
     	    $(".playerChoice").children("p").html("Pick another challenger.")   //pick another opponent
     	    opReady = false;
     	    defenseMovement();
     	    //console.log($(y).data("stats"))
     	   }
      }//inside if ending
 	
   } 

//losing scenario section
   if ($(x).data("stats").currentHP <= 0 && click <= 1){ //if your hp falls below zero reset button function is run.  Click keeps function from creating multiple reset buttons	
     	 click++;
     	 $(".playerChoice").children("p").html("You have been defeated in battle! Click reset to try again.")	 
         resetButt();   
   }
   
 });//end of attacButt click


 	
function resetButt(){
	console.log(click)
	reset = $('<input type="button" value="Reset"/>');
    $(".defenderSec").append(reset);
	$("input").on("click", function(){
    location.reload();
    });
}



