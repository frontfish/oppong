Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	A.background = game.add.sprite(-382, 0, 'background');
	A.title = game.add.sprite(5, 5, 'title', 0);

	A.keys = game.input.keyboard.createCursorKeys();
	A.keys.up.onDown.add(this.endMenu, this);

	A.timer = 0;
    },

    update: function () {
//	if (A.timer && game.time.now - A.timer > 1750) {
	    game.state.start('Play');
//	}
    },

    shiftTween: function (object) {
	if (!A.timer) {
	    game.add.tween(object)
		.to({ x: object.x -205 }, 300, null, true, 0, 0, false)
		.to({ frame: 1 }, 1, null, true, 0, 0, false)
		.to({ x: object.x + 369 }, 600, null, true, 200, 0, false)
		.to({ frame: 2 }, 1, null, true, 0, 0, false)
		.to({ x: object.x + 82 }, 400, null, true, 200, 0, false);
	}
    },

    endMenu: function () {
	this.shiftTween(A.title);
	this.shiftTween(A.background);
	A.timer = A.timer || game.time.now;
    },
};
