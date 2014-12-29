// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

// var player1 = prompt("Pick a name, player1!");
// var player2 = prompt("Pick a name, player2!");
console.log(player1)
console.log(player2)
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

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

    // horizontal winner moves 
  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // Checking for rest of game winning cases
    // diagonal winner moves
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6] 
    // vertical winner moves 
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
  )
  {
    console.log('Somebody won!');
    // TODO: Handle game winner
    setNextTurn();
    onGameWin(currentPlayer);
  }
};

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

// modified version
$(document).on('click', '#newGame-button', function (e)
{
  // todo: reset the game
  // $( "#board .space.veggies" ).remove();
  visited = []
  spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
  ];
  for(var i = 0; i < globalspaceNum.length; i++)
  {
    //reset the board 
    $('#board .space:eq(' + globalspaceNum[i] + ')').removeClass(player1);
    $('#board .space:eq(' + globalspaceNum[i] + ')').removeClass(player2);
  }
  // console.log("hiii")
  // console.log("globalspaceNum" + globalspaceNum)
  // console.log("visited" + visited);
  // globalspaceNum = []
  // click = true;
  $(document).on('click', '#board .space',myFunction);
  console.log(spaces + "am I empty???");

});

var visited = []
globalspaceNum = [];
$(document).on('click', '#board .space',myFunction);

function myFunction(e)
{
  var spaceNum = $(e.currentTarget).index();
  // console.log(contains(visited, spaceNum))
  // ToDo: use contains method to see if space is already occupied
  if(contains(visited,spaceNum))
  {
    alert("square is already occupied. Choose a different square")
    // it is still currentPlayers turn to choose a vacant square
    console.log("currentPlayer " + currentPlayer)
  }
  else
  {
    visited.push(spaceNum)
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
    setNextTurn();
  }
  spaces[spaceNum] = currentPlayer;
  globalspaceNum.push(spaceNum);
  checkForWinner();
}
 
var gameCounter = 0;
function onGameWin (winner) {
  // TODO: Alert who won the game
  alert('Congrats, ' + currentPlayer +  ', you won!')
  // $("#board .space").click("false");
  // $('#board .space').click(function(){return false;});
  // console.log("did I passed this???")
  $(document).off('click', '#board .space')
  gameCounter += 1;
  console.log(gameCounter + " gameCounter")
}

// // Start the game
setNextTurn();
