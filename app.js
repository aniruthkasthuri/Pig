/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, currentPlayer, gamePlaying, prevRoll, winningScore;
function init(){
  scores = [0,0];
  roundScore = 0;
  currentPlayer = 0; //The 1st player is 0
  gamePlaying = true;
  //winningScore = prompt("Please enter the score you want to play to. If the score is below 0, it will automatically be set to 100.");
  //if (winningScore <= 0){
  //  winningScore = 100;
  //}
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
init();
//document.querySelector('#current-'+currentPlayer).textContent = dice;
//document.querySelector('#current-'+currentPlayer).innerHTML = '<em>' + dice + '</em>'

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
      var dice = Math.floor(Math.random()*6) + 1;
      if(prevRoll === 6 && prevRoll === dice){
        prevRoll = 0;
        scores[currentPlayer] = 0;
        document.querySelector('#score-'+currentPlayer).textContent = scores[currentPlayer];
        nextPlayer()
      }
      else {
        prevRoll = dice;
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' +dice+ '.png';

        if (dice === 1) {
          nextPlayer()
        } else {
          roundScore = dice + roundScore;
          document.querySelector('#current-'+currentPlayer).textContent = roundScore;
        }
      }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  var winningScore = document.querySelector('.final-score').value
  if (winningScore == false || winningScore <= 0){
    winningScore = 100;
  }
    if(gamePlaying){
      scores[currentPlayer] = scores[currentPlayer] + roundScore;
      document.querySelector('#score-'+currentPlayer).textContent = scores[currentPlayer];
      if (scores[currentPlayer] >= winningScore){
        document.querySelector('#name-'+currentPlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        nextPlayer();
      }
    }
});
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
  roundScore = 0;
  document.querySelector('#current-'+currentPlayer).textContent = 0;
  currentPlayer = (currentPlayer - 1) * (-1);

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}
