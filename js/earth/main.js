let areaCanvas = document.getElementById('area');

let playerCanvas = document.getElementById('player');

let enemyCanvas = document.getElementById('enemy');

let statusCanvas = document.getElementById('status');

let itemsCanvas = document.getElementById('items');

let rocketCanvas = document.getElementById('rockets');

let explosionCanvas = document.getElementById('explosion');

let areaCtx = areaCanvas.getContext('2d');

let playerCtx = playerCanvas.getContext('2d');

let enemyCtx = enemyCanvas.getContext('2d');

let statusCtx = statusCanvas.getContext('2d');

let itemsCtx = itemsCanvas.getContext('2d');

let rocketCtx = rocketCanvas.getContext('2d');


let exploseCtx = explosionCanvas.getContext('2d');

let gameWidth = areaCanvas.width = playerCanvas.width = enemyCanvas.width = itemsCanvas.width = rocketCanvas.width =  explosionCanvas.width = 960;
let gameHeight= areaCanvas.height = playerCanvas.height = enemyCanvas.height = itemsCanvas.height = rocketCanvas.height = explosionCanvas.height = 500;

let health = 7000;
let score = 0;

statusCtx.font="18px Arial";
statusCtx.fillStyle = '#ffffff';


let bg = new Image();
bg.src = 'bg.png';
let spriteImg = new Image();  // Создание нового объекта изображения
spriteImg.src = 'sprites.png'; 
let explode = new Image();
explode.src = 'explosion.png';
let gameOverImg = new Image();
gameOverImg.src = 'gameOver.jpg';
let requestAnimFrame = window.requestAnimationFrame ||
					   window.webkitrequestAnimationFrame ||
					   window.mozrequestAnimationFrame ||
					   window.orequestAnimationFrame ||
					   window.msrequestAnimationFrame;
let isPlaying = false;
let enemies = [];
let speedLevel = 300;
let respawnInterval;
let respawnTime = 60000;
let spawnAmount = 6;
let missiles = 100;
window.onload = init;

let isLaunched = false;
let enemyCoords = [{
	srcX: 0,
	srcY: 130,
	width: 63,
	height: 59
}, {
	srcX: 63,
	srcY: 130,
	width: 58,
	height: 59
}, {
	srcX: 120,
	srcY: 133,
	width: 50,
	height: 59
}, {
	srcX: 170,
	srcY: 133,
	width: 58,
	height: 58
},{
	srcX: 0,
	srcY: 80,
	width: 53,
	height: 45
},  {
	srcX: 53,
	srcY: 80,
	width: 47,
	height: 49
},{
	srcX: 143,
	srcY: 83,
	width: 44,
	height: 49
}];
let itemDwX, itemDwY, itemWidth, itemHeight;

let explodeCoordsX = 0;
let explodeCoordsY = 0;

let interval;
function increaseEnemyAmount() {
	if(spawnAmount <= 15)
			spawnAmount +=5;
}
// function itemSpawn(srcX,  srcY, width, height) {
// 	clearCtx(itemsCtx);
// 	itemDwX = Math.random()*(gameWidth/2 - 50);
// 	itemDwY = Math.random()*(gameHeight - 50);
// 	itemsCtx.drawImage(spriteImg,srcX,srcY, width, height, itemDwX, itemDwY, width, height );
// 	console.log('item spawn');
// }

function clearCtx(ctx) {
	ctx.clearRect(0, 0 , gameWidth, gameHeight);
}

function Item(srcX, srcY, width, height, dwX, dwY, dWidth, dHeight, speed, img, ctx) {
	this.srcX = srcX;
	this.srcY = srcY;
	this.width = width;
	this.height = height;
	this.dwX = dwX;
	this.dwY = dwY;
	this.dWidth = dWidth;
	this.dHeight = dHeight;
	this.speed = speed;
	this.img = img;
	this.ctx = ctx;
}
Item.prototype.draw = function() {
	this.ctx.drawImage(this.img , this.srcX , this.srcY, this.width, this.height, this.dwX , this.dwY, this.dWidth , this.dHeight);
}

function Player() {
	this.isUp = false;
	this.isDown = false;
	this.isRight = false;
	this.isLeft = false;
	Item.apply(this, arguments);
}
function Entity() {
	Item.apply(this, arguments);
}
let entities = [];

Entity.prototype = Object.create(Item.prototype);
Entity.prototype.constructor = Entity;

 function itemSpawn(srcX,  srcY, width, height , name) {
	clearCtx(itemsCtx);
	itemDwX = Math.random()*(gameWidth/2 - 50);
	itemDwY = Math.random()*(gameHeight - 50);
	entities.push(new Entity(srcX, srcY, width, height, itemDwX, itemDwY, width, height, 0, spriteImg, itemsCtx));
	// debugger;
	entities[length].name = name;
	itemsCtx.drawImage(spriteImg,srcX,srcY, width, height, itemDwX, itemDwY, width, height );
	console.log('item spawn');
} 

Player.prototype = Object.create(Item.prototype);
Player.prototype.constructor = Player;
let player = new Player(0, 0 ,80 ,80 ,10 , playerCanvas.height /2 ,80 ,80 , 300 , spriteImg, playerCtx);

Player.prototype.draw = function() {
	clearCtx(this.ctx);
	Item.prototype.draw.apply(this, arguments);
}
Player.prototype.update = function() {
	for (var i = 0; i < entities.length; i++) {
	if(player.merge(entities[i])) {
		if(entities[i].name === 'bomb') {
			clearAll();
			spawnEnemy(spawnAmount);
			clearCtx(itemsCtx);	
			entities.splice(i, 1);
			i--;
		} else if(entities[i].name === 'weapon') {
			clearCtx(itemsCtx);	
			entities.splice(i, 1);
			i--;
			missiles += 50;
			drawStatus();
		}
	}
}
	player.moveDirection(dt);
}
Player.prototype.moveDirection = function(dt) {
	if(this.isUp) {
		this.dwY -= this.speed*dt;
		player.collide();
	}
	if(this.isDown) {
		this.dwY += this.speed*dt;
		player.collide();
	}
	if(this.isRight){
	 this.dwX += this.speed*dt;
	 player.collide();
	}
	if(this.isLeft) {
		this.dwX -= this.speed*dt;
		player.collide();
	}
}
Player.prototype.merge = function(item) {
	  let XColl=false;
	  let YColl=false;
		if ((this.dwX + this.width >= item.dwX) &&
			(this.dwX <= item.dwX + item.width)) XColl = true;
		if ((this.dwY + this.height >= itemDwY) &&
			(this.dwY <= item.dwY + item.height)) YColl = true;
		if (XColl&YColl) { 
			return true;
		}
		return false;
}
Player.prototype.collide = function() {
	if(this.dwY < 0) this.dwY = 0;
	if(this.dwX < 0) this.dwX = 0;
	if(this.dwY > gameHeight - player.height) this.dwY = gameHeight - player.height;
	if(this.dwX > gameWidth /2) this.dwX = gameWidth/2;
}


function Enemy() {
	this.index;
	Item.apply(this, arguments);
}
Enemy.prototype = Object.create(Item.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
	this.dwX -= this.speed*dt;	
	this.checkImpact();
}
Enemy.prototype.merge = function() {
	if(this.dwX < -100) {
		return false;
	}
	return true;
}
Enemy.prototype.checkImpact = function() {
	if( (this.dwX <= player.dwX + player.width 
		&& this.dwY <= player.dwY + player.height 
		&& this.dwX >= player.dwX 
		&& this.dwY >= player.dwY) ||
		(this.dwX + this.width >= player.dwX 
			&& this.dwX + this.width <= player.dwX + player.width
			&& this.dwY + this.height >= player.dwY 
			&& this.dwY + this.height <= player.dwY + player.height)
	) 
	{
		health -= 100;
		explosion(this.dwX, this.dwY);
		this.dwX = -100;
	}
}

function Rocket() {
	Item.apply(this, arguments);
}
let rockets = [];
Rocket.prototype = Object.create(Item.prototype);
Rocket.prototype.constructor = Rocket;
Rocket.prototype.update = function(dt) {
	this.dwX += this.speed*dt;
	if(this.dwX  > gameWidth) {
            rockets.splice(this, 1);
        }
}

Rocket.prototype.impact = function() {
	for (let  i = 0; i < enemies.length; i++) {
	if(this.dwX <= enemies[i].dwX + enemies[i].width 
		&& this.dwY <= enemies[i].dwY + enemies[i].height 
		&& this.dwX >= enemies[i].dwX 
		&& this.dwY >= enemies[i].dwY) {
		explosion(this.dwX, this.dwY);
		enemies.splice(i,1);
		spawnEnemy(1);
		score += 10;
		drawStatus();
		return true;
	}

}
return false;
};

function clearAll() {
	for (let i = 0; i < enemies.length; i+=1) {
		score += 10;
    	explosion(enemies[i].dwX, enemies[i].dwY);
	}
	setTimeout(function(){
		enemies = [];
		enemyCtx.clearRect(0, 0 , gameWidth, gameHeight);
	});
}


function explosion(x, y) {
		exploseCtx.save();
	for (let i = 0; i < 8; i++) {
	
		exploseCtx.drawImage(explode, explodeCoordsX + 65, explodeCoordsY, 65, 65, x, y , 65 , 65);	
    	
	}
	exploseCtx.restore();
	drawStatus();
	setTimeout(function() {
		exploseCtx.clearRect(0,0, gameWidth, gameHeight);
	},150);

}

function startSpawnEnemies() {
	spawnEnemy(spawnAmount);
}


function spawnEnemy(count) {
	for (let i = 0; i < count; i++) {
		let index = Math.random()*enemyCoords.length | 0;
		enemies.push(new Enemy(enemyCoords[index].srcX,enemyCoords[index].srcY, enemyCoords[index].width, enemyCoords[index].height, 
		Math.random()*(400)+ gameWidth, Math.random()*(gameHeight - 50)  | 0, enemyCoords[index].width, enemyCoords[index].height, Math.random()*speedLevel + speedLevel,
		spriteImg, enemyCtx));
	}
}
function gameOver() {
	document.getElementById('gameOver').style.display = 'block';
	areaCtx.drawImage(gameOverImg, 0,0 ,gameWidth, gameHeight);
}
function reset() {
	clearInterval(interval);
	stopLoop();
	clearAll();
	clearCtx(areaCtx);
	clearCtx(playerCtx);
	clearCtx(enemyCtx);
	clearCtx(statusCtx);
	clearCtx(itemsCtx);
	clearCtx(rocketCtx);
	if(enemies.length) {
		enemies.splice(0,enemies.length);
		}
	rockets = [];
	health = 7000;
	missiles  = 100;
	spawnAmount = 6;
	score = 0;
	document.getElementById('start').style.display = 'none';
}
function init() {
	drawContent();
	document.getElementById('start').style.display = 'block';
	document.getElementById('gameOver').style.display = 'none';
	document.getElementById('start').addEventListener('click', 	ready);
}
setInterval(function () {
		entities = [];
		itemSpawn(0, 260, 50, 45, 'weapon');
	}, Math.random()*60000+20000);

function ready() {
	document.getElementById('titles').style.display ='none';
	reset();
	interval = setInterval(function() {
	missiles += 100;
	if(spawnAmount < 20) {
		spawnEnemy(spawnAmount);
		spawnAmount +=2;
	} else {
		speedLevel = 20;
	}
	
	setTimeout(function(){
		entities = [];
		itemSpawn(150, 0, 50, 50, 'bomb');
	},Math.random()*20000);
}, 60000);
	startLoop();
	increaseEnemyAmount();
	drawStatus();
	document.addEventListener('keydown', checkKeyDown, false);
	document.addEventListener('keyup', checkKeyUp, false);
	document.getElementById('gameOver').style.display = 'none';
}
function drawContent() {
	drawArea();
	player.draw();
	clearCtx(enemyCtx);
	clearCtx(rocketCtx);
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].draw();
	}
	if(isLaunched) {
		for (let i = 0 ; i < rockets.length; i +=1)
		rockets[i].draw();
	} 
}
function drawStatus() {
	clearCtx(statusCtx);
	if(health <= 0) {
		document.getElementById('start').style.display = 'block';
		statusCtx.fillText("Health: " + health, 10, 40);
		statusCtx.fillText("Missiles: " + missiles, 10, 60);
		statusCtx.fillText("Score: " + score, 10, 80);
		stopLoop();
		gameOver();
	} else {
		statusCtx.fillText("Health: " + health, 10, 40);
		statusCtx.fillText("Missiles: " + missiles, 10, 60);
		statusCtx.fillText("Score: " + score, 10, 80);
	}
}
function drawArea() {
	areaCtx.drawImage(bg, 0, 0, gameWidth, gameHeight);
}
let lastTime, dt;
function loop() {
	if(isPlaying) {
		let now = Date.now();
   		dt = (now - lastTime) / 1000.0;
		drawContent();
		update(dt);
    	lastTime = now;
		requestAnimFrame(loop);
	}
}

function startLoop() {
	isPlaying = true;
	startSpawnEnemies();
	loop();
}

function stopLoop() {
	isPlaying = false;
	
}
function update(dt) {
	player.update(dt);
	if(enemies.length == 0) 
		{
			spawnEnemy(spawnAmount);
		}
	for (let i = 0; i < enemies.length; i++) {
		if(enemies[i].merge(dt)) {
			enemies[i].update(dt);
		} else {
			enemies.splice(i, 1);
			i--;
			spawnEnemy(1);
		}
	}
	if(isLaunched) {
		for (let i = 0; i < rockets.length; i+=1) {
			rockets[i].update(dt);
			if(rockets.length != 0)
			if(rockets[i].impact(dt)) {
				rockets.splice(i, 1);
				i--;
			}
		}
	}
}

function checkKeyDown(e) {
	let keyId = e.keyCode || e.which;
	switch(keyId) {
		case 87: { player.isUp = true; e.preventDefault();}
			break;
		case 83: { player.isDown = true; e.preventDefault();}
			break;
		case 65: { player.isLeft = true; e.preventDefault();}
			break;
		case 68: { player.isRight = true; e.preventDefault();}
			break;
		default:break;
	}
}

function checkKeyUp(e) {
	let keyId = e.keyCode || e.which;
	switch(keyId) {
		case 87: { player.isUp = false; e.preventDefault();}
			break;
		case 83: { player.isDown = false; e.preventDefault();}
			break;
		case 65: { player.isLeft = false; e.preventDefault();}
			break;
		case 68: { player.isRight = false; e.preventDefault();}
			break;
			case 32: {
				if(missiles != 0) {
				var rocket = new Rocket(200, 0, 43, 30, 
					player.dwX + player.width + 10, player.dwY + player.height /2 - this.height, 43, 30, 400,
					spriteImg, rocketCtx);
				missiles--;
				rockets.push(rocket);
				rocket.dwX =  player.dwX + player.width + 10;
				rocket.dwY = player.dwY + player.height /2;
				rocket.draw();
				isLaunched = true;
				rocket.update(dt);
				drawStatus();
				}
			}
		default:break;
	}
}

