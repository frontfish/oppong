Game.Play = function (game) { };

A.paddleSpeed = {
    x: 50,
    y: 500,
};
A.ballSpeed = 200;

Game.Play.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	A.keys = game.input.keyboard.createCursorKeys();

	this.createBackground();

	A.balls = game.add.group();
	A.balls.enableBody = true;

	this.createPaddle();
	this.createBall(0, A.h / 2, 60 - Math.rand(120), 'beige');
	this.createBall(A.w, A.h / 2, 240 - Math.rand(120), 'purple');
    },

    update: function () {
	game.physics.arcade.collide(A.balls, A.paddle);
	game.physics.arcade.collide(A.balls, A.balls);
	A.balls.forEachAlive(this.ballCollideMiddle, this);

	this.controls();

	if (A.balls.countLiving() === 0) {
	    this.endPlay();
	}
    },

    controls: function () {
	A.paddle.body.velocity.y = A.keys.up.isDown ? -A.paddleSpeed.y : 0;
	A.paddle.body.velocity.y += A.keys.down.isDown ? A.paddleSpeed.y : 0;

	vel = A.keys.left.isDown ? -A.paddleSpeed.x : 0;
	vel += A.keys.right.isDown ? A.paddleSpeed.x : 0;	
	this.shift(vel);
    },

    shift: function (vel) {
	if (A.paddle.x < 100 || A.paddle.x > A.w - 100) {
	    vel = 0;
	}

	A.paddle.body.velocity.x = vel;
	A.background.body.velocity.x = vel;
    },

    createBackground: function () {
	A.background = game.add.sprite(-300, 0, 'background');
	game.physics.arcade.enable(A.background);
    },

    createPaddle: function () {
	A.paddle = game.add.sprite(A.w / 2, A.h / 2, 'paddle');
	A.paddle.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(A.paddle);
	A.paddle.body.collideWorldBounds = true;
	A.paddle.body.immovable = true;
//	A.paddle.scale.y = 250 / A.paddle.height;
    },

    createBall: function (x, y, theta, color) {
	var ball;

	theta *= Math.PI / 180;

	ball = A.balls.create(x, y, 'ball-' + color);
	ball.anchor.setTo(0.5, 0.5);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.setTo(1.01, 1.01);

	ball.color = color;

	ball.body.velocity.x = A.ballSpeed * Math.cos(theta);
	ball.body.velocity.y = A.ballSpeed * Math.sin(theta);
    },

    ballCollideMiddle: function (ball) {
	if (Math.abs(ball.x - A.paddle.x) <= ball.body.halfWidth) {
	    this.endPlay();
	    ball.kill();
	}
    },

    endPlay: function () {
	game.state.start('End');
    },
};
