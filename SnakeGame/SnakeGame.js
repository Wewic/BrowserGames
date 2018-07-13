var canvas;
var ctx;

const numStepsAcrossScreen = 25;
const framesPerSecond = 6;

var snakeHead = {
	posX: 312,
	posY: 312
}

var direction = 'up';

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
	document.addEventListener("keydown", function(evt){
		if (evt.keyCode == 37) {
			direction = 'left';
		}
		if (evt.keyCode == 38) {
			direction = 'up';
		}
		if (evt.keyCode == 39) {
			direction = 'right';
		}
		if (evt.keyCode == 40) {
			direction = 'down';
		}
	});

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
	checkWrapAround();

	switch(direction) {
		case 'left':
			snakeHead.posX -= 24;
			break;
		case 'right':
			snakeHead.posX += 24;
			break;
		case 'up':
			snakeHead.posY -= 24;
			break;
		case 'down':
			snakeHead.posY += 24;
			break;
		default:
			alert('No direction has been given.')
	}
}

function checkWrapAround() {
	if (snakeHead.posX > canvas.width) {
		snakeHead.posX = -24;
	}
	if (snakeHead.posX < -24) {
		snakeHead.posX = canvas.width;
	}
	if (snakeHead.posY > canvas.height) {
		snakeHead.posY = -24;
	}
	if (snakeHead.posY < -24) {
		snakeHead.posY = canvas.height;
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX,topY,width,height);
}
