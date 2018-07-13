var canvas;
var ctx;

const numStepsAcrossScreen = 25;
const framesPerSecond = 6;

var snakeHead = {
	posX: 312,
	posY: 312
}

var randFoodPosX = foodPositionGenerator(numStepsAcrossScreen);
var randFoodPosY = foodPositionGenerator(numStepsAcrossScreen);

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

	drawBackground();
	drawSnakeHead();
	drawFood();

	startGame();
}

function startGame() {
	setInterval(function() {
		moveEverything();
		drawBackground();
		drawSnakeHead();
		drawFood();
	}, 1000/framesPerSecond);
}

function drawBackground() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
}

function drawSnakeHead(centerX, centerY, radius, drawColor) {
	colorRect(snakeHead.posX, snakeHead.posY, canvas.width/numStepsAcrossScreen, canvas.height/numStepsAcrossScreen, 'white');
}

function foodPositionGenerator(max) {
	return Math.floor(Math.random() * max);
}

function drawFood() {
	let foodPosX = canvas.width/numStepsAcrossScreen * randFoodPosX;
	let foodPosY = canvas.height/numStepsAcrossScreen * randFoodPosY;

	if (foodPosX === snakeHead.posX && foodPosY === snakeHead.posY) {
		randFoodPosX = foodPositionGenerator(numStepsAcrossScreen);
		randFoodPosY = foodPositionGenerator(numStepsAcrossScreen);
		foodPosX = canvas.width/numStepsAcrossScreen * randFoodPosX;
		foodPosY = canvas.height/numStepsAcrossScreen * randFoodPosY;
	}
	
	colorRect(foodPosX, foodPosY, canvas.width/numStepsAcrossScreen, canvas.height/numStepsAcrossScreen, 'red');
}

function moveEverything() {
	snakeHead.posX -= 24;

	if (snakeHead.posX  > canvas.width) {
		snakeHead.posX  = 0;
	}
	if (snakeHead.posX  < 0) {
		snakeHead.posX  = canvas.width;
	}
	if (snakeHead.posY > canvas.height) {
		snakeHead.posY = 0;
	}
	if (snakeHead.posY < 0) {
		snakeHead.posY = canvas.height;
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX,topY,width,height);
}
