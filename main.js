// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

// more concise way of writing checkForWinner
var winner = [];
var possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]] 
var checkForWinner = function()
{
  for(var i = 0; i < possibilities.length; i++)
  {
    possibility = possibilities[i]
    // ex: possibilities[0] = [0,1,2]
    if (spaces[possibility[0]] === spaces[possibility[1]] && spaces[possibility[1]] === spaces[possibility[2]])
    {
      winner = possibility
      console.log("winner" + winner)
      onGameWin(currentPlayer)
    }
  }
}

//// Alternate checkForWinner without a for loop
// var winner = []
// var checkForWinner = function () {
//   // Because (NaN === NaN) is always false, we can safely assume
//   // that if three spaces in a row are the same, all three spaces are
//   // marked by a player, and not all empty.
  
//     // horizontal winner moves 
//   if (spaces[0] === spaces[1] && spaces[1] === spaces[2])
//   {
//     winner = [0,1,2]
//     onGameWin(currentPlayer);
//   }
//   else if(spaces[3] === spaces[4] && spaces[4] === spaces[5])
//   {
//     winner = [3,4,5]
//     onGameWin(currentPlayer);
//   }
//   else if(spaces[6] === spaces[7] && spaces[7] === spaces[8])
//   {
//     winner = [6,7,8]
//     onGameWin(currentPlayer);
//   }
//     // Checking for rest of game winning cases
//     // diagonal winner moves

//   else if(spaces[0] === spaces[4] && spaces[4] === spaces[8])
//   {
//     winner = [0,4,8]
//     onGameWin(currentPlayer);
//   }
//   else if(spaces[2] === spaces[4] && spaces[4] === spaces[6] )
//   {
//     winner = [2,4,6]
//     onGameWin(currentPlayer);
//   }
//     // vertical winner moves 
//   else if(spaces[0] === spaces[3] && spaces[3] === spaces[6])
//   {
//     winner = [0,3,6]
//     onGameWin(currentPlayer);
//   }
//   else if(spaces[1] === spaces[4] && spaces[4] === spaces[7])
//   {
//     winner = [1,4,7]
//     onGameWin(currentPlayer);
//   }
//   else if(spaces[2] === spaces[5] && spaces[5] === spaces[8])  
//   {
//     winner=[2,5,8]
//     onGameWin(currentPlayer);
//   }
// };

// red_highlight function called in onGameWin to create animation for all winning spaces
var red_highlight = function()
{
    for (var i = 0; i < winner.length;i++)
    {
      $('.space:eq(' + winner[i] + ')').addClass('winner')
    }
}

// contains method searches for a particular number in the array and returns 
// true or false if the number is in the array. Use to determine if a space has 
// already been clicked 
var contains = function(array, num)
{
  for(var i = 0; i < array.length; i++)
  {
    if (array[i] === num)
    {
      return true
    }
  }
  return false
}

// click button functionality: 
// create a click button to start a new game
$(document).on('click', '#newGame-button', function ()
{
  // button is initially set to non to avoid confusion the the users. 
  $("#newGame-button").css("display","none")
  visited = []
  // restart all spaces to be NaN 
  spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
  ];
  // remove player1 and player2 images in the corresponding spaces
  for(var i = 0; i < globalspaceNum.length; i++)
  {
    //reset the board by removing the player classes in the particular space indexes
    // eq: Reduce the set of matched elements to the one at the specified index
    $('#board .space:eq(' + globalspaceNum[i] + ')').removeClass(player1);
    $('#board .space:eq(' + globalspaceNum[i] + ')').removeClass(player2);
  }
  // remove the winner class so that the red highlights disappear when a new game starts
  for(var i = 0; i < winner.length; i++)
  {
    $('.space:eq(' + winner[i] + ')').removeClass('winner')
  }
  // calls state of space once more when a click is made 
  // do something to the whole document
  // .on( events [, selector ], handler )
  // event - 'click'
  // #board .space - any elements that are descendents of the selected #board.space
  // handler - state_of_space how this will be handled using a function
  $(document).on('click', '#board .space',state_of_space);
});


// keeps track of visited spaces so that an alert can be made to the player to choose a 
// different space
var visited = []
// had to create this as a global variable since globalspaceNum will take the values from spaceNum which is 
// declared locally
// used to determine which spaces to remove when game restarts
globalspaceNum = [];
$(document).on('click', '#board .space',state_of_space);
function state_of_space(e)
{
  var spaceNum = $(e.currentTarget).index();
  if(contains(visited,spaceNum))
  {
    alert("square is already occupied. Choose a different square")
    // it is still currentPlayers turn to choose a vacant square
    console.log("currentPlayer " + currentPlayer)
  }
  else
  {
    // push index of space that has been visited
    visited.push(spaceNum)
    // add image to the space
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
    //call for the next turn
    setNextTurn();
  }
  spaces[spaceNum] = currentPlayer;
  globalspaceNum.push(spaceNum);
  checkForWinner();
}
 
var player1_score = 0;
var player2_score = 0;
function onGameWin (winner) {
  setNextTurn();
  // calls red_highlight
  red_highlight();
  // alerts the players who won
  alert('Congrats, ' + currentPlayer +  ', you won!')
  // updates scores of each player
  if(currentPlayer == player1)
  {
    player1_score += 1;
  }
  else{
    player2_score += 1; 
  } 
  scoreBoard();
  // disables click after someone has won
  $(document).off('click', '#board .space')
  // button now appears using the css method by changing display of button to block
  $("#newGame-button").css("display","block")
}

// creates the table that records the score of the game 
function scoreBoard(){
    // takes the id player_score and reveals the text of the score
   $("#player1_score").text(player1_score);
   $("#player2_score").text(player2_score);
}

//Start the game
setNextTurn();
