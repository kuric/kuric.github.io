const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function arenaSweep() {
	let rowCount = 1;
	outer: for (let y = arena.length - 1; y > 0; --y) {
				for (let x = 0; x < arena[y].length; ++x) {
					if(arena[y][x] === 0) {
						continue outer;
					}
				}

				const row = arena.splice(y , 1)[0].fill(0);
				arena.unshift(row);
				++y;

				player.score += rowCount * 10;
				rowCount *= 2;
			}
	
}
function collide(arena, player) {
	const [m, o] = [player.matrix, player.pos];
	for(let y = 0; y < m.length; ++y) {
		for(let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !==0 && 
				(arena[y + o.y] &&
				arena[y + o.y][x + o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}
function createMatrix(w, h) {
	const matrix = [];
	while(h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function createPiece(type) {
	if(type === "T") {
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		];
	} else if(type === "O") {
		return [
			[2 , 2],
			[2 , 2],
		];
	} else if(type === "L") {
		return [
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3],
		];
	}
	else if(type === "I") {
		return [
			[0, 4, 0 , 0],
			[0, 4, 0,  0],
			[0, 4, 0,  0],
			[0, 4, 0,  0],
		];
	} else if(type === "J") {
		return [
			[0, 5, 0],
			[0, 5, 0],
			[5, 5, 0],
		];
	} else if(type === "S") {
		return [
			[0, 6, 6],
			[6, 6, 0],
			[0, 0, 0],
		];
	} else if(type === "Z") {
		return [
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0],
		];
	}
}

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = colors[value];
				context.fillRect(x + offset.x, y + offset.y, 1, 1);
			}
		});
	});
}

function draw() {
	context.fillStyle = '#000000';
	context.fillRect( 0 , 0 , canvas.width, canvas.height);

	drawMatrix(arena, {x: 0, y:0});
	drawMatrix(player.matrix, player.pos);
}

function merge(arena , player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}
function playerDrop() {
	player.pos.y++;
	if(collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
		arenaSweep();
		updateScore();
	}
 	dropCounter = 0;
}

function playerMove(direction) {
	player.pos.x += direction;
	if(collide(arena, player)) {
		player.pos.x -= direction;
	}
}
let tetrisGame = {
	playerObj: [],
}
function playerReset() {
	const pieces = 'ILJOTSZ';
	player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y = 0;
	player.pos.x =  (arena[0].length / 2 | 0) - 
					(player.matrix[0].length / 2 | 0);
	if(collide(arena, player)) {
		arena.forEach(row => row.fill(0));
		gameOver();
		updateScore();
	}
}
function gameOver() {
	var elem = document.getElementById('popup');
	elem.style.display ='block';
	var scoreVar = document.querySelector('#popup p');
	scoreVar.innerHTML = "Your score: " + player.score;
	stopFlag = true;
	audio.pause();
	audio.currentTime = 0;
	document.getElementById('startAgain').addEventListener('click' , saveProgress);
	document.getElementById('startAgain').addEventListener('click', start);
}
function saveProgress() {
	var playerName = document.getElementById('playerName').value; 
	var playerData = [];
	playerData.push(playerName, player.score);
	tetrisGame.playerObj.push(playerData);
	// tetrisGame.score.push(player.score);
	localStorage.setItem('tetrisGame', JSON.stringify(tetrisGame));
	var playerEntry = document.createElement('p');
	playerEntry.innerHTML = document.getElementById('playerName').value + ": " + player.score;
	document.getElementById('scoreTable').appendChild(playerEntry);
	document.getElementById('playerName').value = '';
}
function playerRotate(direction) {
	const pos = player.pos.x;
	let offset = 1;
	rotate(player.matrix , direction);
	while(collide(arena , player)) {
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if(offset > player.matrix[0].length) {
			rotate(player.matrix , -direction);
			player.pos.x = pos;
			return;
		}
	}
}

function rotate(matrix , direction) {
	for (let y = 0; y < matrix.length; ++y) {
		for(let x = 0; x < y; ++x) {
			[matrix[x][y], matrix[y][x]] = [matrix[y][x] , matrix[x][y]];
		}
	}
	if(direction > 0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}

}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	if(dropCounter > dropInterval) {
		playerDrop();
	}
	if(!stopFlag) {
	 	draw();
		requestAnimationFrame(update);
	}
}
function updateScore() {
	document.getElementById('score').innerText = player.score;
	switch(player.score / 1000 | 0 ) {
		case 1: dropInterval = 900;
		break;
		case 2: dropInterval = 800;
		break;
		case 3: dropInterval = 700;
		break;
		case 4: dropInterval = 600;
		break;
		case 5: dropInterval = 500;
		break;
		case 6: dropInterval = 400;
		break;
		case 7: dropInterval = 300;
		break;
		case 9: dropInterval = 200;
		break;
		case 10: dropInterval = 100;
		break;
		default: break;
	}
}
const colors = [
    null,
    '#FF0D0D',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#F5FF38',
    '#3877FF',
];
const player = {
	pos : {x: 0, y:  0},
	matrix: null,
	score: 0,
}
const arena = createMatrix(12, 20);
document.addEventListener('keydown', event => {
 if(event.keyCode === 37) { 
 	playerMove(-1);
 } else  if(event.keyCode === 39) {
 	playerMove(1);
 } else if(event.keyCode === 40) {
 	playerDrop();
 } else if(event.keyCode === 90) {
 	playerRotate(-1);
 } else if(event.keyCode === 88) {
	playerRotate(1);
 }
});
let stopFlag;
let audio = new Audio('audio/sound.mp3');
document.addEventListener("DOMContentLoaded", ready);
function ready() {
	fillScoreTable();
	document.getElementById('start').addEventListener('click', start);
}
function fillScoreTable() {
	tetrisGame = JSON.parse(localStorage.getItem('tetrisGame')) || tetrisGame;
	if (tetrisGame) {
		tetrisGame.playerObj.sort(sortByScore);
		for (var i = 0; i < tetrisGame.playerObj.length; i++) {
			if(i>=10) break;
			var playerEntry = document.createElement('p');
			playerEntry.innerHTML = tetrisGame.playerObj[i][0].substring(0,30) + ": " + tetrisGame.playerObj[i][1];
			document.getElementById('scoreTable').appendChild(playerEntry);
		}
	}
}
function sortByScore(a,b) {
	if (a[1] > b[1]) {
		return -1;
	} else if (a[1] < b[1]) {
		return 1;
	} else return 0;
}
function start() {
	player.score = 0;
	document.getElementById('start').style.display = 'none';
	document.getElementById('popup').style.display = 'none';
	audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
	}, false);
	dropInterval = 1000;
	audio.play();
	stopFlag = false;
	playerReset();
	updateScore();
	update();
}