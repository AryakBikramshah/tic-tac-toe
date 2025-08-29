const cell = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const reset = document.querySelector('.reset');
const choose = document.querySelectorAll('.player1 .choose');
const secPlayer = document.getElementById('player2-choice')
const toggleBtn = document.querySelector('.toggle');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');


toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle('light');
})

let player1 = null;
let player2 = null;
let currentPlayer = null;
let boardBlock = Array(9).fill('');
let gameActive = false;

let score1 = 0;
let score2 = 0;

let winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

choose.forEach(btn=>{
    btn.addEventListener('click',()=>{
        player1 = btn.id;
        player2 = player1 === 'X'? 'O': 'X';
        currentPlayer = player1;
        secPlayer.textContent = player2
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s turn`;
    })
})



function handleClick(e,index){
    if(!gameActive) return;
    
    if(boardBlock[index] !== "") return;

    boardBlock[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");

      if(checkWinner(currentPlayer)){
       message.textContent = `Player ${currentPlayer} wins`;
       gameActive = false; 
       return
    }
        if(!boardBlock.includes("")) {
        message.textContent = "It's a draw!";
        gameActive = false;

        if(currentPlayer === player1){
            score1++;
            score1Display.textContent = score1;
        }else{
            score2++;
            score2Display.textContent = score2;
        }
        return;
    }
    currentPlayer = currentPlayer === 'X'? 'O':'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner(player){
    for(let i = 0; i < winningCombo.length; i++){
        const combo = winningCombo[i]
        if(combo.every(index => boardBlock[index] === player)){
            return true;
        }
     }
      return false
}
cell.forEach((c, index) => {
    c.addEventListener('click', (e) => handleClick(e, index));
});

reset.addEventListener('click', ()=>{
    boardBlock.fill('');
    cell.forEach(c=>{
        c.textContent = ''
        c.classList.remove('taken');
    })
    player1 = null;
    player2 = null;
    currentPlayer = null;
    gameActive = false;
    message.textContent = 'Choose X or O to start!';
    secPlayer.textContent = '';
})
