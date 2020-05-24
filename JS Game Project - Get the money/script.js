const container = document.querySelector('.gameBoard');
const scoreBoard = document.querySelector('.score');
const startbutton = document.querySelector('.startbutton');
let lasthideout = false;
let gameOver = false;
let score;
let myMusic;
let mySound1;
let mySound2;
startbutton.addEventListener('click', startGame);

function startGame() {
    startbutton.style.display = 'none';
    makeGameBoard();
    startEnemies();
    score = 0;
    updatescore();
    myMusic = new Audio("music.mp3");
    myMusic.play();
    myMusic.loop = true;
    mySound1 = new Audio("explode.mp3");
    mySound2 = new Audio("coin-sound.mp3");

}

function startEnemies() {
    let hideout = randomJump();
    let temp = Math.floor(Math.random() * 3) + 1;
    let tempClass = temp > 1 ? 'up' : 'up2';
    hideout.classList.add(tempClass);
    const time = Math.round(Math.random() * (1500 - 250) + 250);
    setTimeout(function () {
        hideout.classList.remove(tempClass);
        if (!gameOver) startEnemies();
    }, time);
}

function randomJump() {
    const hideouts = document.querySelectorAll('.hideout');
    const index = Math.floor(Math.random() * hideouts.length);
    if (hideouts[index].enemyId === lasthideout) {
        return randomJump();
    }
    lasthideout = hideouts[index].enemyID;
    return hideouts[index];
}

function makeGameBoard() {
    let hideOutsCreated = 8;
    container.innerHTML = ' ';
    for (let x = 0; x < hideOutsCreated; x++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'hideout');
        div.enemyId = x;
        let enemy = document.createElement('div');
        enemy.setAttribute('class', 'enemy');
        enemy.onclick = shot1;
        div.appendChild(enemy);
        let friend = document.createElement('div');
        friend.setAttribute('class', 'friend');
        friend.onclick = shot2;
        div.appendChild(friend);
        let wall = document.createElement('div');
        wall.setAttribute('class', 'wall');
        div.appendChild(wall);
        container.appendChild(div);
    }
}

function updatescore() {
    scoreBoard.innerHTML = "Scor: "+ score;
    message = score > 10 ? 'Felicitări, ai câștigat!' : 'Oops...se pare că ai pierdut! Pentru a câștiga, trebuie să ajungi la un scor de 10. Încearcă din nou!';
    if (score > 10 || score < 0) {
        myMusic.pause();
        gameOver = true;
        startbutton.style.display = 'block';
        alert(message);
    }
}
function shot1() {
    console.log('FAIL');
    mySound1.play();
    score = score - 5;
    this.parentNode.classList.remove('up2');
    updatescore()
}

function shot2(e) {
    console.log('HIT');
    mySound2.play();
    score++;
    this.parentNode.classList.remove('up');
    updatescore();
}



