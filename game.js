const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const bossHpElement = document.getElementById('bossHp');
const currencyElement = document.getElementById('currency');
const phaseElement = document.getElementById('phase');
const playerHpElement = document.getElementById('playerHp');
const playerDamageElement = document.getElementById('playerDamage');
const playerDefenseElement = document.getElementById('playerDefense');
const playerDeathCount = document.getElementById('deathCount')

const attackRadius = 60;

// Item Drop Config:
const maximumLevelDroppedAbove = 3;
const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
const rarityWeights = [79, 15, 5, 1]; // Changes the weighting of rarities.
const tiers = [1,2,3,4,5]
const tierWeights = [150,25,15,4,1]

// Player attributes
// let player = new Player(x: 400, y: 300, speed: 5, attack: 10, defense: 5, hp: 100, maxHp: 100 };
let player = new Player(400, 300, 5, 20, 10, 100, 100);

// Boss attributes (add vx and vy for movement)
let boss = { hp: 100, phase: 1, maxHp: 100, attack: 20, x: 600, y: 300, vx: 2, vy: 2 };

// Controls
let keys = {};

// Upgrades, type = {'attack','defense','hp'}
function getCost(type) {
	return player.upgrade[type]*10*Math.floor(2**(player.upgrade[type]/10))+100
}

function upgrade(type) {
	const cost = getCost(type);
	if (player.currency >= cost) {
		player.upgrade[type]++;
		player.currency-=cost;
		updateUI();
	}
}

// Currency Function
function calcCurrency() {
	let expFactor = 1.15
	let hpRemainingPercentage = (boss.hp / boss.maxHp) * 100;
	let preExpGain = (100 - Math.round(hpRemainingPercentage))*boss.phase*Math.max(Math.random(),0.5) + 100*boss.phase;
	return preExpGain*(expFactor**boss.phase)*1/3
}

function resetBoss() {
    boss.phase = 1;
	bossStatUpdate();
	updateUI();
}

function resetPlayer() {
	player.x = 400;
	player.y = 300;
	player.hp = player.maxHp*(player.upgrade['hp']/10+1);
}

function bossDeath() {
	boss.phase++;
	bossStatUpdate();
	player.currency += calcCurrency()*1/4;
	if (Math.random()<=0.25) {
	player.addItemToInventory(new Equipment(chooseWeighted(rarities,rarityWeights),chooseWeighted(tiers,tierWeights),getRandomIntGlobal(boss.phase,boss.phase+maximumLevelDroppedAbove)))	
	}
    updateUI();
}

// Beautify numbers to remove unnecessary decimals
function beautify(num, decimals = 2) {
    return parseFloat(num.toFixed(decimals));
}

// Move the boss and reverse direction if it hits the edges (similar to DVD screensaver)
function moveBoss() {
    // Update boss position
    boss.x += boss.vx;
    boss.y += boss.vy;

    // Check for collisions with the canvas boundaries
    // If the boss hits the horizontal boundaries (left or right edges)
    if (boss.x + 50 > canvas.width || boss.x - 50 < 0) {
        boss.vx = -boss.vx; // Reverse horizontal direction
    }
    
    // If the boss hits the vertical boundaries (top or bottom edges)
    if (boss.y + 50 > canvas.height || boss.y - 50 < 0) {
        boss.vy = -boss.vy; // Reverse vertical direction
    }
}

function bossStatUpdate() {
	if (boss.phase === 1) {
	boss.maxHp = 100;
	boss.hp = boss.maxHp;
	boss.attack = 20;
	return
	}
	boss.maxHp = 100*Math.pow(2,boss.phase)*Math.max(Math.random(),0.5);
	boss.hp = boss.maxHp;
	boss.attack = 20*Math.pow(1.5,boss.phase)*Math.max(Math.random(),0.5);
}


// Update UI elements
function updateUI() {
    bossHpElement.textContent = beautify(boss.hp);
    currencyElement.textContent = beautify(player.currency);
    phaseElement.textContent = boss.phase;
    playerHpElement.textContent = beautify(player.hp);
    playerDamageElement.textContent = beautify(player.attack*(player.upgrade['attack']/10+1));
    playerDefenseElement.textContent = beautify(player.defense*(player.upgrade['defense']/10+1));
	playerDeathCount.textContent = player.deathCount;
	player.updateEquipmentDisplay();
	updateUpgradeDisplay();
}

function draw() {
	// Draw boss
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(boss.x, boss.y, 50, 0, Math.PI * 2);
ctx.fill();

// Boss health bar (fixed length with red background and green overlay)
// Border for the health bar
ctx.strokeStyle = 'black'; // Border color
ctx.lineWidth = 2;
ctx.strokeRect(boss.x - 50, boss.y - 50, 100, 10);

// Red background (full length)
ctx.fillStyle = 'red';
ctx.fillRect(boss.x - 50, boss.y - 50, 100, 10);

// Green overlay (representing current health)
ctx.fillStyle = 'green';
ctx.fillRect(boss.x - 50, boss.y - 50, (boss.hp / boss.maxHp) * 100, 10);

// Display health percentage
ctx.fillStyle = 'black';
ctx.font = '12px Arial';
ctx.fillText(Math.floor((boss.hp / boss.maxHp) * 100) + '%', boss.x - 10, boss.y - 55);

// Draw player
ctx.fillStyle = 'blue';
ctx.fillRect(player.x, player.y, 50, 50);

// Player health bar (fixed length with red background and green overlay)
// Border for the health bar
ctx.strokeRect(player.x, player.y - 10, 50, 5);

// Red background (full length)
ctx.fillStyle = 'red';
ctx.fillRect(player.x, player.y - 10, 50, 5);

// Green overlay (representing current health)
ctx.fillStyle = 'green';
ctx.fillRect(player.x, player.y - 10, (player.hp / (player.maxHp*(1+player.upgrade['hp']/10))) * 50, 5);

// Display player health percentage
ctx.fillStyle = 'black';
ctx.font = '10px Arial';
ctx.fillText(Math.floor((player.hp / (player.maxHp*(1+player.upgrade['hp']/10))) * 100) + '%', player.x + 15, player.y - 15);

}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();

    // Player takes damage from the boss
    if (player.x >= boss.x-attackRadius && player.x <= boss.x+attackRadius && player.y >= boss.y-attackRadius && player.y <= boss.y+attackRadius && boss.hp>0){
		let def = player.defense*(1+player.upgrade['defense']/10);
        player.hp -= Math.max(((def+boss.attack+10)/(def+10))-1,0.1); // Small damage over time
        if (player.hp <= 0) {
			resetBoss();
			resetPlayer();
			player.deathCount++;
			updateUI();
        }
    }

    // Boss battle logic
    if (boss.hp <= 0) {
		bossDeath()
    }

    // Player movement
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

    // Boss takes damage when the player is near
    if (player.x >= boss.x-attackRadius && player.x <= boss.x+attackRadius && player.y >= boss.y-attackRadius && player.y <= boss.y+attackRadius) {
        boss.hp -= beautify(player.attack / (boss.phase*30)*(player.upgrade['attack']/10+1)); // Boss takes damage
		player.currency += calcCurrency()*1/240
        updateUI();
    }
	
	moveBoss();
    requestAnimationFrame(gameLoop);
}

// Event listeners for controls
document.addEventListener('keydown', function (event) {
    keys[event.key] = true;
});

document.addEventListener('keyup', function (event) {
    keys[event.key] = false;
});

//GAMELOOP
function saveLoop(){
  saveGame();
  setTimeout(saveLoop,5000)
}
loadGame();
saveLoop();

// Start the game loop
gameLoop();
player.updateEquipmentDisplay()
updateUI()
updateUpgradeDisplay()