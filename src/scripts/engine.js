const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.getElementById("time-left"),
        score: document.getElementById("score"),
        lifeCount: document.getElementById("lifeCount"),
        easyMode: document.getElementById("easyMode"),
        hardMode: document.getElementById("hardMode")
    },
    values:{
        timerId: null,
        gameVelocity: 650,
        hitPosition: 0,
        result: 0,
        currentTime: 45,
        countDownTimerId: setInterval(countDown, 1000),
        lifeId: 3
    }
}

async function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        alert("Game Over! O seu Resultado foi: " + state.values.result)
    }
}

function playSound(){
    let audio = new Audio("./src/audio/hit.m4a")
    audio.volume = .1
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

async function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function loseLife(){
    state.values.lifeId--
    state.view.lifeCount.textContent = state.values.lifeId
    state.values.hitPosition = null
    if(state.values.lifeId === 0){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        alert("Game Over! O seu Resultado foi: " + state.values.result)
    }
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound()
            }else{
                loseLife()
            }
        })
    })
}

function resetGame(){
    location.reload();
}

function changeToEasy(){
    localStorage.setItem("difficulty", "easy")
    resetGame()                     
}

function changeToHard(){
    localStorage.setItem("difficulty", "hard")
    resetGame()
}


function init(){ const difficulty = localStorage.getItem("difficulty")
    if (difficulty === "hard") {
        state.values.gameVelocity = 200
    } else {
        state.values.gameVelocity = 650
    }
    
    moveEnemy()
    addListenerHitBox()
}

init()