var canvas;
var ctx;

const numStepsAcrossScreen = 25;
const framesPerSecond = 6;

var snakeHeadX = 300;
var snakeHeadY = 300;



window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

	drawEverything();

	startGame();
}

function startGame() {
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
}

function drawBackground() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
}

function drawSnakeHead(centerX, centerY, radius, drawColor) {
	colorRect(snakeHeadX, snakeHeadY, canvas.width/numStepsAcrossScreen, canvas.height/numStepsAcrossScreen, 'white');
}

function foodPositionGenerator(max) {
	return Math.floor(Math.random() * (max + 1));
}

function drawFood() {
	var randomXPos = canvas.width/numStepsAcrossScreen * foodPositionGenerator(numStepsAcrossScreen);
	var randomYPos = canvas.height/numStepsAcrossScreen * foodPositionGenerator(numStepsAcrossScreen);
	colorRect(randomXPos, randomYPos, canvas.width/numStepsAcrossScreen, canvas.height/numStepsAcrossScreen, 'red');
}

function drawEverything() {
	drawBackground();
	drawSnakeHead();
	drawFood();
}

function moveEverything() {
	snakeHeadX -= 24;
	loopToOtherSide();
	
}

function loopToOtherSide() {
	if (snakeHeadX > canvas.width) {
		snakeHeadX = 0;
	}
	if (snakeHeadX < 0) {
		snakeHeadX = canvas.width;
	}
	if (snakeHeadY > canvas.height) {
		snakeHeadY = 0;
	}
	if (snakeHeadY < 0) {
		snakeHeadY = canvas.height;
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX,topY,width,height);
}
