Game.Play = function (game) { };

A.paddleSpeed = {
    x: 30,
    y: 500,
};
A.ballSpeed = 200;
A.delay = 0;

Game.Play.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	this.createKeys();

	this.createBackground();
	this.createBounds();

	A.balls = game.add.group();
	A.balls.enableBody = true;

	this.createPaddle();
	this.createBall(0, A.h / 2, 60 - Math.rand(120), 'beige');
	this.createBall(A.w, A.h / 2, 240 - Math.rand(120), 'purple');
	this.createScore();

	Game.Menu.prototype.createMute(this);
    },

    update: function () {
	game.physics.arcade.collide(A.balls, [A.paddle, A.bounds], this.ballCollide, null, this);
	A.balls.forEachAlive(this.ballCollideMiddle, this);

	this.controls();
	
	if (A.timer && game.time.now - A.timer > A.delay) {
	    A.timer = 0;
	    game.state.start('Menu');
	}
    },

    controls: function () {
	if (!A.timer) {
	    A.paddle.body.velocity.y = (A.keys.up.isDown || A.keys.W.isDown) ? -A.paddleSpeed.y : 0;
	    A.paddle.body.velocity.y += (A.keys.down.isDown || A.keys.S.isDown) ? A.paddleSpeed.y : 0;
	}

	vel = (A.keys.left.isDown || A.keys.A.isDown) ? -A.paddleSpeed.x : 0;
	vel += (A.keys.right.isDown || A.keys.D.isDown) ? A.paddleSpeed.x : 0;	
	this.shift(vel);
    },

    shift: function (vel) {
	if ((A.paddle.x < 150 && vel < 0) || (A.paddle.x > A.w - 150 && vel > 0) || A.timer) {
	    vel = 0;
	}

	A.paddle.body.velocity.x = vel;
	A.background.body.velocity.x = vel;
    },

    createKeys: function () {
	A.keys = game.input.keyboard.createCursorKeys();

	A.keys.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
	A.keys.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
	A.keys.D = game.input.keyboard.addKey(Phaser.Keyboard.D);
	A.keys.W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    },

    createBackground: function () {
	A.background = game.add.sprite(A.w / 2, 0, 'background');
	A.background.anchor.x = 0.5;
	game.physics.arcade.enable(A.background);
    },

    createBounds: function () {
	var bounds = {};

	A.bounds = game.add.group();
	A.bounds.enableBody = true;

	bounds.left = A.bounds.create(0, 0, 'paddle');
	bounds.left.scale.y = A.h / 100;
	bounds.left.anchor.x = 1;
	bounds.left.body.immovable = true;

	bounds.right = A.bounds.create(A.w, 0, 'paddle');
	bounds.right.scale.y = A.h / 100;
	bounds.right.body.immovable = true;

	bounds.up = A.bounds.create(0, 0, 'paddle');
	bounds.up.scale.x = A.w / 18;
	bounds.up.anchor.y = 1;
	bounds.up.body.immovable = true;

	bounds.down = A.bounds.create(0, A.h, 'paddle');
	bounds.down.scale.x = A.w / 18;
	bounds.down.body.immovable = true;
    },

    createPaddle: function () {
	A.paddle = game.add.sprite(A.w / 2, 61, 'paddle');
	A.paddle.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(A.paddle);
	A.paddle.body.collideWorldBounds = true;
	A.paddle.body.immovable = true;
//	A.paddle.scale.y = 250 / A.paddle.height; //
    },

    createBall: function (x, y, theta, color) {
	var ball;

	theta *= Math.PI / 180;

	ball = A.balls.create(x, y, 'ball-' + color);
	ball.anchor.setTo(0.5, 0.5);
	ball.body.bounce.setTo(1.005, 1.005);

	ball.color = color;

	ball.body.velocity.x = A.ballSpeed * Math.cos(theta);
	ball.body.velocity.y = A.ballSpeed * Math.sin(theta);

	ball.hitSound = function () {
	    if (A.audio) {
		A.sounds.hit[ball.color].play('', 0, 0.5, false, true);
	    }
	};
    },

    createScore: function () {
	A.score = {
	    beige: 0,
	    purple: 0,
	};

	A.text.scoreBeige = game.add.text(A.w - 8, 5, '0', { font: '30px Arial', fill: A.color.purple });
	A.text.scoreBeige.anchor.x = 1;
	game.physics.arcade.enable(A.text.scoreBeige);

	A.text.scorePurple = game.add.text(10, 8, '0', { font: '30px Arial', fill: A.color.beige });
	game.physics.arcade.enable(A.text.scorePurple);
    },
    
    ballCollideMiddle: function (ball) {
	if (Math.abs(ball.x - A.paddle.x) <= ball.body.halfWidth) {
	    this.endPlay();
	}
    },

    ballCollide: function (obj1, obj2) {
	var ball = obj2.parent === A.balls ? obj2 : obj1;

	if (obj1 === A.paddle || obj2 === A.paddle) {
	    if (ball.color === 'beige') {
		A.score.purple++;
		A.text.scorePurple.text = A.score.purple;
	    }
	    if (ball.color === 'purple') {
		A.score.beige++;
		A.text.scoreBeige.text = A.score.beige;
	    }	    
	}

	this.animateBallCollide(ball);
	ball.hitSound();
    },

    animateBallCollide: function (ball) {
	var hitTime = 70;

	if (ball.body.touching.left || ball.body.touching.right || ball.body.touching.up || ball.body.touching.down) {
	    game.add.tween(ball.scale).to({x: 1.2, y: 1.2}, hitTime, null, true, 0, false, false).to({x: 1, y: 1}, hitTime, null, true, hitTime, false, false);
	}
    },

    animateToMenu: function () {
	A.delay = Math.abs(A.background.x - 218) * 5;

	game.add.tween(A.background).to({ x: 218 }, A.delay, null, true, 0, 0, false);
	game.add.tween(A.paddle).to({ x: 218, y: 61 }, A.delay, null, true, 0, 0, false);
    },

    endPlay: function () {
	A.balls.children[0].kill();
	A.balls.children[1].kill();

	if (A.audio) {
	    A.sounds.die.play('', 0, 0.5, false, true);
	}
	A.music.stop();
	this.animateToMenu();
	A.timer = game.time.now;
    },
};
