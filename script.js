const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorButton = document.getElementById('scissors');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const gameState = document.getElementById('gameState');

rockButton.addEventListener('click',() => playGame(rock));
paperButton.addEventListener('click',() => playGame(paper));
scissorButton.addEventListener('click',() => playGame(scissors));

// This is a doublylinked list with Rock <-> Paper <-> Scissors
class choiceNode{
    constructor(choice, next, prev){
        this.choice = choice;
        this.next = next;
        this.prev = prev;
    }
}

const rock = new choiceNode('rock');
const paper = new choiceNode('paper');
const scissors = new choiceNode('scissors');
rock.next = paper;
paper.next = scissors;
scissors.next = rock;
rock.prev = scissors;
paper.prev = rock;
scissors.prev = paper;

let gameRound = 0;
let finalComputerScore = 0;
let finalPlayerScore = 0;
let computerChoice = paper;

function playGame(playerChoice){
    gameRound++;
    if(gameRound > 1){
        updateComputerChoice(); 
    }
    if(playerChoice.prev === computerChoice){
        finalPlayerScore++;
        gameState.textContent = "Player wins this round";
    }else if(playerChoice.next === computerChoice){
        finalComputerScore++;
        gameState.textContent = "Chars bot wins this round";
    }else{
        gameState.textContent = "It's a tie";
    }
    updateScoreUI();
}

function updateComputerChoice(){
    if(finalPlayerScore > finalComputerScore){
        computerChoice = computerChoice.prev;
    }else if(finalPlayerScore < finalComputerScore){
        computerChoice = computerChoice.prev;

    }else{
        computerChoice = computerChoice.next;
    }
}

function updateScoreUI(){
    playerScore.textContent = finalPlayerScore;
    computerScore.textContent = finalComputerScore;
}