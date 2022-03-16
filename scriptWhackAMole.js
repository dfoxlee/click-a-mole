/* 
User opens up app; time and score are at 0:00 0
User presses start time starts counting up
Moles start popping up randomly at some rate
If the user clicks the mole it registers a score
Multiple clicks can be counted on the same mole on the same pop
Rate at which moles pop up begins to increase, remember random aspect
When a click is not registered time stops and the score and time are highlighted
*/

/* 
    listen for start click
    if start click is registered start time and begin popping moles
    popping moles picks random mole to increase bottom value
*/
let score = 0;
let scoreCounter = document.getElementById("scoreCounter");
let timeCounter = document.getElementById("timeCounter");
let mole = document.querySelectorAll(".mole");
let moleArray = Array.prototype.slice.call(mole);
let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");

// Scoring

function clickHit() {
    score += 1;
    scoreCounter.innerHTML = score;
};

function moleListeners(e) {
    e.addEventListener("click", clickHit);
};

moleArray.forEach(moleListeners);

// Game Start

function startGame() {
    // Timer starts
    scoreCounter.innerHTML = 0;
    let count = 0;
    function updateTime() {
        timeCounter.innerHTML = count;
        count += 1;
    };

    let timerInterval = setInterval(updateTime, 1000);

    let molePopRate = 1000;

    // Pop moles
    function popMoles() {
        let ranNum = Math.floor(Math.random()*8) + 1;
        let ranMole = document.getElementById(`mole-${ranNum}`);
        ranMole.style.bottom = "40px";
        function moleDown() {
            ranMole.style.bottom = "-60px";
        };
        setTimeout(moleDown, molePopRate);
        molePopRate -= 0;

        if(count===20) {
            timeCounter.innerHTML = "0:00";
            clearInterval(timerInterval);
            clearInterval(molePops);
        }
    };
    let molePops = setInterval(popMoles, molePopRate);

    // Reset the Game
    function resetGame() {
        scoreCounter.innerHTML = 0;
        timeCounter.innerHTML = "0:00";
        clearInterval(timerInterval);
        clearInterval(molePops);
    }

    resetButton.addEventListener("click", resetGame);
};

startButton.addEventListener("click", startGame);