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

var visited = []
$(document).on('click', '#board .space', function (e) {
  // console.log("before any new number is pushed to visited: " + visited)
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
  console.log("which player is in space " + spaceNum + ": " + spaces[spaceNum])
  //console.log("after space is pushed to visited: " + visited)
  // console.log("what is in visited: " + visited)
  // console.log('You clicked on space #' + spaceNum);
  // Marks the space with the curent player's name
  //console.log("What's in spaces?" + spaces)
  //console.log("was space already visited?")
  // Adds a class to elem so css can take care of the visuals
  checkForWinner();
});

var exit = false 
function onGameWin (winner) {
  // TODO: Alert who won the game
  alert('Congrats, ' + currentPlayer +  ', you won!')
  exit = true;
  // $("#board .space").click("false");
  // $('#board .space').click(function(){return false;});
  // console.log("did I passed this???")
  $(document).off('click', '#board .space')
}

// Start the game
setNextTurn();
