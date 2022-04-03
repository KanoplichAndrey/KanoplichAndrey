'use strict';

const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {
	game.load.image('sky', 'img/bgMain.png');
	game.load.image('ground', 'img/ground.png');
	game.load.image('bullet', 'img/bullet.png');
	game.load.spritesheet('coin', 'img/belarusianCoin_sprite.png', 68, 68);
	game.load.atlas('dude', 'img/dude_sprite.png', 'img/dude_sprite.json');
	game.load.atlas('zombieFemale', 'img/zombieFemale_sprite.png', 'img/zombieFemale_sprite.json');
	game.load.atlas('zombieMale', 'img/zombieMale_sprite.png', 'img/zombieMale_sprite.json');
	game.load.spritesheet('explosion', 'img/explode.png', 128, 128);
	game.load.audio('coinSound', 'sounds/coin.wav');
	game.load.audio('environment', 'sounds/ambientmain.ogg');


}

let player;
let playerWay = false;	//false == right, true == left
let playerLife = 10;
let weapon;
let fireButton;
let Zombies; //class for zombie
let zombie;
let platforms;
let cursors;
let Coins;  //class for coins
let coin;
let environment;
let score = 0;
let scoreText;

function create() {
	game.add.tileSprite(0, 0, 10000, 600, 'sky');
	game.world.setBounds(0, 0, 10000, 600);

	environment = game.add.audio('environment');
	environment.loopFull();
	environment.play('environment');

	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors = game.input.keyboard.createCursorKeys();

//PLATFORMS SETTING----------------------------------------------------------------------------------------------------------------------------------
	platforms = game.add.group();
	platforms.enableBody = true;

	for (var i = 0, j = 0; i < game.world.width/500; i++, j+=500) {	//500 - it is width of ground img
		let ground = platforms.create(j, game.world.height - 41, 'ground');
		ground.body.immovable = true;
	}

	for (var i = 0, j = 120; j < game.world.width; i++, j+=randomInteger(10, 300)) {	//500 - it is width of ground img

		let randomPlaceY = randomInteger(game.world.height - 100, game.world.height - 450);
		let platform = platforms.create(j, randomPlaceY, 'ground');
		let randomWidth = randomInteger(0.10, 1);

		platform.scale.setTo(randomWidth, 1);
		platform.body.immovable = true;
	}

	function randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


//PLAYER SETTING----------------------------------------------------------------------------------------------------------------------------------
	player = game.add.sprite(15, game.world.height - 200, 'dude');
	player.scale.setTo(0.15, 0.15);

	game.physics.arcade.enable(player);
	game.camera.follow(player);


	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	player.animations.add('runLeft', Phaser.Animation.generateFrameNames('runL_', 1, 8), 10, true);
	player.animations.add('runRight', Phaser.Animation.generateFrameNames('runR_', 1, 8), 10, true);
	player.animations.add('idleRight', Phaser.Animation.generateFrameNames('idleR_', 1, 10), 15, true);
	player.animations.add('idleLeft', Phaser.Animation.generateFrameNames('idleL_', 1, 10), 15, true);
	player.animations.add('jumpRight', Phaser.Animation.generateFrameNames('jumpR_', 1, 10), 5, true);
	player.animations.add('jumpLeft', Phaser.Animation.generateFrameNames('jumpL_', 1, 10), 5, true);
	player.animations.add('meleeRight', Phaser.Animation.generateFrameNames('meleeR_', 1, 7), 5, true);
	player.animations.add('meleeLeft', Phaser.Animation.generateFrameNames('meleeL_', 1, 7), 5, true);
	player.animations.add('shootRight', Phaser.Animation.generateFrameNames('shootR_', 1, 3), 5, true);
	player.animations.add('shootLeft', Phaser.Animation.generateFrameNames('shootL_', 1, 3), 5, true);
	player.animations.add('deadRight', Phaser.Animation.generateFrameNames('deadR_', 1, 10), 5, true);
	player.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 10), 5, true);

//ZOMBIES SETTING----------------------------------------------------------------------------------------------------------------------------------
	Zombies = function (game, x, y) {

		if (randomInteger(2, 12) % 2 === 0) {
			Phaser.Sprite.call(this, game, x, y, 'zombieFemale');
		} else {
			Phaser.Sprite.call(this, game, x, y, 'zombieMale');
		}

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;
	    this.animations.add('walkLeft', Phaser.Animation.generateFrameNames('walkL_', 1, 10), 10, true);
		this.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkR_', 1, 10), 10, true);
		this.animations.add('attackRight', Phaser.Animation.generateFrameNames('attackR_', 1, 8), 15, true);
		this.animations.add('attackLeft', Phaser.Animation.generateFrameNames('attackL_', 1, 8), 15, true);
		this.animations.add('deadRight', Phaser.Animation.generateFrameNames('deadR_', 1, 12), 5, true);
		this.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 12), 5, true);
	    this.body.gravity.y = 800;
	    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
	    this.body.bounce.x = 1;
	    this.body.collideWorldBounds = true;
	    this.body.velocity.x = 80;

	    this.scale.setTo(0.15, 0.15);
	    game.add.existing(this);
	};

	Zombies.prototype = Object.create(Phaser.Sprite.prototype);
	Zombies.prototype.constructor = Zombies;

	Zombies.prototype.update = function() {

		game.physics.arcade.collide(this, platforms, function (zombie, platform) {
	        if (zombie.body.velocity.x > 0 && zombie.x > platform.x + (platform.width - zombie.width) ||
	                zombie.body.velocity.x < 0 && zombie.x < platform.x) {
	            zombie.body.velocity.x *= -1; 
	        } 
	        if (zombie.body.velocity.x > 0) {
	            zombie.animations.play('walkRight');
	        } else {
	            zombie.animations.play('walkLeft');
	        }
	    });

		game.physics.arcade.overlap(this, player, attackZombies, null, this);

	 	function attackZombies(zombie, player) {
			console.log(playerLife);
			playerLife -= 1;
			console.log(playerLife);
		}

		game.physics.arcade.overlap(this, weapon.bullets, bulletHitZombie, null, this);
    
	    function bulletHitZombie (zombie, bullet) {
	    	bullet.kill();
    		weapon.bulletHit(bullet);
	    	zombie.kill();
	    }
	};

	for (var i = 0; i < game.world.width/100; i++) {
		zombie = new Zombies(game, i + 100 * randomInteger(1, 50), 0);
	}

//COINS SETTING----------------------------------------------------------------------------------------------------------------------------------
	Coins = function createStars(game, x, y) {
		Phaser.Sprite.call(this, game, x * 70, y, 'coin');
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;
	    this.animations.add('coin');
		this.body.gravity.y = 300;
		this.body.bounce.y = 0.7 + Math.random() * 0.2;
	    this.scale.setTo(0.7, 0.7);

	   	this.coinSound = game.add.audio("coinSound");
		// this.anchor.x = 0.5;
	 //    this.anchor.y = 0.5;
		
		game.add.existing(this);
	}

	Coins.prototype = Object.create(Phaser.Sprite.prototype);
	Coins.prototype.constructor = Coins;

	Coins.prototype.update = function() {
		this.animations.play('coin', 10, true, false);
		game.physics.arcade.collide(this, platforms);
		game.physics.arcade.overlap(this, player, collectCoins, null, this);

		function collectCoins(coin, player) {
			this.coinSound.play();
			coin.kill();
			score += 1;
			scoreText.text = 'Score: ' + score + 'rubles';
		}
	};

	for (var i = 0; i < game.world.width/70; i++) {
		coin = new Coins(game, i, 0);
	}

//WEAPON SETTING-----------------------------------------------------------------------------------------------------------------------------------

    weapon = game.add.weapon(30, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    weapon.bulletSpeed = 500;
    weapon.fireRate = 390;
    weapon.trackSprite(player, 65, 37, true);
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    weapon.bulletHit = function bulletExplosion(bullet) {
    	let explosion = game.add.sprite(bullet.x, bullet.y, 'explosion');

    	// let explosionSound = game.add.audio("explosionSound");

		explosion.anchor.x = 0.5;
	    explosion.anchor.y = 0.5;
		explosion.animations.add('explosion');
		explosion.animations.play('explosion', 25, false, true);

		// explosionSound.play();
    }


//TEXT SETTING-----------------------------------------------------------------------------------------------------------------------------------
	scoreText = game.add.text(16, 16, 'Score: 0 rubles', { fontSize: '32px', fill: '#FFF' });


//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 
	}

}

function update() {
	let hitPlatform = game.physics.arcade.collide(player, platforms);

	game.physics.arcade.overlap(weapon.bullets, platforms, bulletHitPlatform);

    function bulletHitPlatform (bullet, platform) {
    	bullet.kill();
    	weapon.bulletHit(bullet);
    }

	
	
	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		playerWay = true;

		if (cursors.up.isDown) {
			player.animations.play('jumpLeft');
		} else {
			player.animations.play('runLeft');
		}

	} else if (cursors.right.isDown) {
		player.body.velocity.x = 150;
		playerWay = false;

		if (cursors.up.isDown) {
			player.animations.play('jumpRight');
		} else {
			player.animations.play('runRight');
		}

	} else if (cursors.up.isDown) {

		if (playerWay) {
			player.animations.play('jumpLeft');
		} else {
			player.animations.play('jumpRight');
		}

	} else if (cursors.down.isDown) {

	} else if (fireButton.isDown) {
		if (playerWay) {
			player.animations.play('shootLeft');
			weapon.bulletSpeed = -500;
			weapon.fire();
		} else {
			player.animations.play('shootRight');
			weapon.bulletSpeed = 500;
			weapon.fire();
		}

	} else {

		if (!player.body.touching.down && !hitPlatform) {

			if (playerWay) {
				player.animations.play('jumpLeft');
			} else {
				player.animations.play('jumpRight');
			}
		} else {

			if (playerWay) {
				player.animations.play('idleLeft');
			} else {
				player.animations.play('idleRight');
			}
		}
	}

	if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
		player.body.velocity.y = -350;
	}

}





// // -----------------------------
// function render() {

//     game.debug.cameraInfo(game.camera, 32, 32);
//     game.debug.spriteCoords(player, 800, 32);
//     weapon.debug(32, 300);
// }
// // -----------------------------
