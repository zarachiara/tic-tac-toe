// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

// console.log(player1)
// console.log(player2)
var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;

// Players take turns and the label in the DOM is updated
var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

// checks for any spaces that are identical to determine a goal state.
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

// contains method that searches through an array and determines if a certain value exists.
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

// checks if space is already occupied and alerts the player to choose another
// space
var visited = []
$(document).on('click', '#board .space', function (e) {
  // console.log("before any new number is pushed to visited: " + visited)
  var spaceNum = $(e.currentTarget).index();
  // console.log(contains(visited, spaceNum))
  // ToDo: use contains method to see if space is already occupied
  if(contains(visited,spaceNum))
  {
    alert("square is already occupied. Choose a different square")
  }
  else
  {
    visited.push(spaceNum)
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
    setNextTurn();
  }
  spaces[spaceNum] = currentPlayer;
  checkForWinner();
});

var exit = false 
function onGameWin (winner) {
  alert('Congrats, ' + currentPlayer +  ', you won!')
  exit = true;

  // disables any clicking functionality ones the game is finished.
  $(document).off('click', '#board .space')
}

// Start the game
setNextTurn();
