const DIFFICULTY = { easy: 100, medium: 50, hard: 25 };
const SCORE_MULTIPLIES = {easy: 1, medium: 2, hard: 3};
const WALL_BONUS = {off: 1, on: 2};

var gameArea;
var snake;
var food;
var wall = false;
var score = document.getElementById("score");

var difficulty = DIFFICULTY.easy;
var wallBonus = WALL_BONUS.off;
var scoreMultiplies = SCORE_MULTIPLIES.easy;

let isTurned;
let inputs = { left: 37, up: 38, right: 39, down: 40, escape: 27 };
let isPressed = { left: false, up: false, right: false, down: false };
let gameFrames;

var deathSound = new Audio("./assets/sounds/death.wav");

if (window.mobilecheck() && 'addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

function startGame() {


    document.getElementById("mainMenu").style.display = "none";

    if (window.mobilecheck()){
        document.getElementById("mobileControllers").style.display = "block";
        document.getElementById("scoreTextMobile").style.display = "inline";
    }else{
        document.getElementById("sidebar").style.display = "block";
    }

    snake = new Snake();
    gameArea = new GameArea();
    //Starts the game loop
    gameFrames = setInterval(game, difficulty);
}

//Main Game Loop
function game() {
    gameArea.clear();

    score.innerText = (((snake.length - 3) * scoreMultiplies * wallBonus));
    document.getElementById("scoreMobile").innerText = score.innerText;

    if (food == null) food = new Food();

    getKeyPress();
    
    snake.move();
    food.draw();
    snake.draw();

    checkCollision();
}

function checkCollision() {
    if (snake.headPosition.x == food.position.x && snake.headPosition.y == food.position.y) snake.eat();

    for (let i = 1; i < snake.parts.length; i++)
        if (snake.headPosition.x == snake.parts[i].position.x && snake.headPosition.y == snake.parts[i].position.y) gameOver();

    if (wall && (snake.headPosition.x >= gameArea.width || snake.headPosition.x < 0 
        || snake.headPosition.y < 0 || snake.headPosition.y >= gameArea.height))
        gameOver();
}

function gameOver() {
    deathSound.play();
    document.getElementById("sidebar").style.display = "none";
    var area = document.getElementById("gameArea");
    area.parentNode.removeChild(area);
    document.getElementById("gameOverMenu").style.display = "block";
    document.getElementById("gameOverScore").innerText = score.innerText;
    clearInterval(gameFrames);
}

function getKeyPress() {
    document.addEventListener('keydown', keyDownHandler, false);
    isTurned = false;

    function keyDownHandler(event) {

        if(event.keyCode == inputs.escape)
            snake.heading = null;

        if (event.keyCode == inputs.up && isPressed.up == false && isPressed.down == false && !isTurned) {
            snake.heading = "up";
            isPressed = { left: false, up: true, right: false, down: false };
            isTurned = true;

        } else if (event.keyCode == inputs.down && isPressed.down == false && isPressed.up == false && !isTurned) {
            snake.heading = "down";
            isPressed = { left: false, up: false, right: false, down: true };
            isTurned = true;

        } else if (event.keyCode == inputs.left && isPressed.left == false && isPressed.right == false && !isTurned) {
            snake.heading = "left";
            isPressed = { left: true, up: false, right: false, down: false };
            isTurned = true;

        } else if (event.keyCode == inputs.right && isPressed.right == false && isPressed.left == false && !isTurned) {
            snake.heading = "right"
            isPressed = { left: false, up: false, right: true, down: false };
            isTurned = true;
        }
    }
}

//Button Handlers
function optionsButtonClicked() {
    document.getElementById("optionsButton").style.display = "none";
    document.getElementById("optionsMenu").style.display = "inline";
}

function difficultyButtonClicked(difficulty) {
    document.getElementById("optionEasy").style.backgroundColor = "#2f3236";
    document.getElementById("optionMedium").style.backgroundColor = "#2f3236";
    document.getElementById("optionHard").style.backgroundColor = "#2f3236";

    document.getElementById("option" + difficulty).style.backgroundColor = "#44474b";

    switch (difficulty) {
        case "Easy":
            this.difficulty = DIFFICULTY.easy;
            scoreMultiplies = SCORE_MULTIPLIES.easy;
            break;
        case "Medium":
            this.difficulty = DIFFICULTY.medium;
            scoreMultiplies = SCORE_MULTIPLIES.medium;
            break;
        case "Hard":
            this.difficulty = DIFFICULTY.hard;
            scoreMultiplies = SCORE_MULTIPLIES.hard;
            break;
    }
}

function wallButtonClicked(wallOption) {
    document.getElementById("optionWallOn").style.backgroundColor = "#2f3236";
    document.getElementById("optionWallOff").style.backgroundColor = "#2f3236";

    document.getElementById("optionWall" + wallOption).style.backgroundColor = "#44474b";

    switch (wallOption) {
        case "On":
            wall = true;
            wallBonus = WALL_BONUS.on;
            break;
        case "Off":
            wall = false;
            wallBonus = WALL_BONUS.off;
            break;
    }
}

function mobileControllerPressed(button){
    if (button == inputs.up && isPressed.up == false && isPressed.down == false && !isTurned) {
        snake.heading = "up";
        isPressed = { left: false, up: true, right: false, down: false };
        isTurned = true;

    } else if (button == inputs.down && isPressed.down == false && isPressed.up == false && !isTurned) {
        snake.heading = "down";
        isPressed = { left: false, up: false, right: false, down: true };
        isTurned = true;

    } else if (button == inputs.left && isPressed.left == false && isPressed.right == false && !isTurned) {
        snake.heading = "left";
        isPressed = { left: true, up: false, right: false, down: false };
        isTurned = true;

    } else if (button == inputs.right && isPressed.right == false && isPressed.left == false && !isTurned) {
        snake.heading = "right"
        isPressed = { left: false, up: false, right: true, down: false };
        isTurned = true;
    }
}