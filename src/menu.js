Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	A.background = game.add.sprite(-382, 0, 'background');

	A.title = game.add.sprite(5, 5, 'title', 0);
	A.title.alpha = 0;
	game.add.tween(A.title).to({ alpha: 1 }, 600, null, true, 250, 0, false);

	A.paddle = A.score ? game.add.sprite(218, 61, 'paddle') : {};

	A.keys = game.input.keyboard.createCursorKeys();
	A.keys.up.onDown.add(this.endMenu, this);

	A.timer = 0;
    },

    update: function () {
	if (A.timer && game.time.now - A.timer > 1750) {
	    A.timer = 0;
	    game.state.start('Play');
	}
    },

    shiftTween: function (object) {
	game.add.tween(object)
	    .to({ x: object.x -205 }, 300, null, true, 0, 0, false)
	    .to({ frame: 1 }, 1, null, true, 0, 0, false)
	    .to({ x: object.x + 369 }, 600, null, true, 200, 0, false)
	    .to({ frame: 2 }, 1, null, true, 0, 0, false)
	    .to({ x: object.x + 82 }, 400, null, true, 200, 0, false);
    },

    endMenu: function () {
	if (!A.timer) {
	    A.paddle.alpha = 0;
	    this.shiftTween(A.title);
	    this.shiftTween(A.background);
	    A.timer = game.time.now;

	    if (A.audio) {
		A.music.play('', 0, 0.7, true, true);
	    }
	}
    },
};
