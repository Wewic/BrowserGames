var canvas;
var ctx;

var ballX = 50;
var ballSpeedX = 1;
var ballY = 50;
var ballSpeedY = 1;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 1;

var showWinScreen = false;

var paddle1Y = 100;
var paddle2Y = 100;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

var numPlayers = 1;

const framesPerSecond = 1000;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return { x:mouseX, y:mouseY };
}

function handleMouseClick(evt) {
	if(showWinScreen) {
		player2Score = 0;
		player1Score = 0;
		showWinScreen = false;
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

	loadMainMenu();

	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});
}

function loadMainMenu() {
	const onePX = canvas.width/4;
	const onePY = canvas.height/2 + 100;
	const twoPX = canvas.width/2 + 100;
	const twoPY = canvas.height/2 + 100;

	drawBackground();

	// Test box
	// colorRect(twoPX, twoPY, 100, 20, 'red');
	
	ctx.fillStyle = 'white';
	ctx.font = "30px Arial";
	ctx.fillText("Ping Pong Game",canvas.width/2 - 130,canvas.height/2);

	ctx.font = "20px Arial";
	ctx.fillText("One-Player",onePX, onePY);
	canvas.addEventListener('click', 
		function(evt) {
			var mousePos = calculateMousePos(evt);
			if (mousePos.x > onePX && 
				mousePos.x < onePX + 100 &&
				mousePos.y < onePY &&
				mousePos.y > onePY - 20) {
				numPlayers = 1;
				startGame();
			} 
		});

	ctx.font = "20px Arial";
	ctx.fillText("Two-Player", twoPX, twoPY);
	canvas.addEventListener('click', 
		function(evt) {
			console.log("Two Player");
			var mousePos = calculateMousePos(evt);
			if (mousePos.x > twoPX && 
				mousePos.x < twoPX + 100 &&
				mousePos.y < twoPY &&
				mousePos.y > twoPY - 20) {
				numPlayers = 2;
				player2Movement();
				startGame();
			} 
		});
}

function startGame() {
	console.log("Game Start");
	setInterval(function() {
		drawEverything();
		moveEverything();
	}, 1000/framesPerSecond);
}

function ballReset() {
	ballSpeedX = -ballSpeedX/3;
	ballSpeedY = -ballSpeedY/3;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	if (player1Score >= WINNING_SCORE || 
		player2Score >= WINNING_SCORE) {
		showWinScreen = true;
	}
}

function drawBackground() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
}

function colorBall(centerX, centerY, radius, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0,Math.PI*2, true);
	ctx.fill();
}

function drawPaddles() {
	colorRect(0,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT, 'white');
	colorRect(canvas.width - PADDLE_WIDTH,paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT, 'white');
}

function colorRect(leftX, topY, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX,topY,width,height);
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2Y < ballY-35) {
		paddle2Y++;
	}
	else if (paddle2YCenter > ballY+35) {
		paddle2Y--;
	}
}

function player2Movement() {
	document.addEventListener("keydown", function(evt){
		if (evt.keyCode == 87) {
			console.log(paddle2Y);
			paddle2Y -= 5;
		}
		if (evt.keyCode == 83) {
			console.log(paddle2Y);
			paddle2Y += 5;
		}
	});
}

function moveEverything() {
	if (showWinScreen) {
		drawWinScreen();
		return;
	}

	if (numPlayers == 1) {
		computerMovement();
	}

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	if (ballX < 0) {
		if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) { 
			ballSpeedX = -ballSpeedX;
			
			var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.1;
		}
		else {
			player2Score++;
			ballReset();
		}
	}
	else if (ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;		

			var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.1;	
		}	
		else {
			player1Score++;
			ballReset();
		}	
	}
	if (ballY > canvas.height || ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}

function displayScore() {
	ctx.fillStyle = 'white';
	ctx.fillText('Player 1 Score', canvas.width/4, 100);
	ctx.fillText(player1Score, canvas.width/4, 120);
	ctx.fillText('Player 2 Score', canvas.width/2 + 100, 100);
	ctx.fillText(player2Score, canvas.width/2 + 100, 120);
}

function drawNet() {
	for (var i=0; i<canvas.height; i+= 40) {
		colorRect(canvas.width/2 - 1, i, 2, 20, 'white');
	}
}

function drawWinScreen() {
	drawBackground();
	displayScore();
	ctx.fillStyle = 'white';
	if (player1Score >= WINNING_SCORE) {
		ctx.fillText("Player 1 Wins!", canvas.width/2 - 70, canvas.height/2 - 100);
	}
	else if (player2Score >= WINNING_SCORE) {
		ctx.fillText("Player 2 Wins!", canvas.width/2 - 70, canvas.height/2 - 100);
	}
	ctx.fillText("Click to Continue", canvas.width/2 - 70, canvas.height/2);
	canvas.addEventListener('click', handleMouseClick);
}

function drawEverything() {
	if (showWinScreen) {
		drawWinScreen();
		return;
	}
	drawBackground();
	colorBall(ballX, ballY, 10, 'white');
	drawPaddles();
	drawNet();
	displayScore();
}
