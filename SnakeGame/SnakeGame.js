var canvas;
var ctx;

const NUM_STEPS_ACROSS_SCREEN = 25;
const FRAMES_PER_SECOND = 6;

//  Based off width of canvas
var RADIUS;

var snakeHead = {
	posX: 312,
	posY: 312
}

var snake = [];
var direction = 'up';

var randFoodPosX = foodPositionGenerator(NUM_STEPS_ACROSS_SCREEN);
var randFoodPosY = foodPositionGenerator(NUM_STEPS_ACROSS_SCREEN);

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

	RADIUS = canvas.width/NUM_STEPS_ACROSS_SCREEN;

	drawBackground();

	drawFood();

	snake.push(snakeHead);
	drawSnake(snake, RADIUS, 'white');

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

		drawFood();

		drawSnake(snake, RADIUS, 'white');
	}, 1000/FRAMES_PER_SECOND);
}

function drawBackground() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawSnake(snakeParts, radius, drawColor) {
	for (let i = 0; i < snakeParts.length; i++) {
		colorRect(snakeParts[i].posX, snakeParts[i].posY, radius, radius, drawColor);
	}
}

function foodPositionGenerator(max) {
	return Math.floor(Math.random() * max);
}

function drawFood() {
	let foodPosX = canvas.width/NUM_STEPS_ACROSS_SCREEN * randFoodPosX;
	let foodPosY = canvas.height/NUM_STEPS_ACROSS_SCREEN * randFoodPosY;

	if (foodPosX === snakeHead.posX && foodPosY === snakeHead.posY) {
		eatFood(foodPosX, foodPosY);
	}

	colorRect(foodPosX, foodPosY, canvas.width/NUM_STEPS_ACROSS_SCREEN, canvas.height/NUM_STEPS_ACROSS_SCREEN, 'red');
}

function eatFood(foodPosX, foodPosY) {
	randFoodPosX = foodPositionGenerator(NUM_STEPS_ACROSS_SCREEN);
	randFoodPosY = foodPositionGenerator(NUM_STEPS_ACROSS_SCREEN);
	foodPosX = canvas.width/NUM_STEPS_ACROSS_SCREEN * randFoodPosX;
	foodPosY = canvas.height/NUM_STEPS_ACROSS_SCREEN * randFoodPosY;
}

function moveEverything() {
	checkWrapAround();

	switch(direction) {
		case 'left':
			snake[0].posX -= 24;
			break;
		case 'right':
			snake[0].posX += 24;
			break;
		case 'up':
			snake[0].posY -= 24;
			break;
		case 'down':
			snake[0].posY += 24;
			break;
		default:
			alert('No direction has been given.')
	}
}

function checkWrapAround() {
	if (snake[0].posX > canvas.width) {
		snake[0].posX = -24;
	}
	if (snake[0].posX < -24) {
		snake[0].posX = canvas.width;
	}
	if (snake[0].posY > canvas.height) {
		snake[0].posY = -24;
	}
	if (snake[0].posY < -24) {
		snake[0].posY = canvas.height;
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX,topY,width,height);
}
