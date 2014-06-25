Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen


	// load everything
	game.load.image('background', 'assets/img/background.png');
	game.load.image('paddle', 'assets/img/paddle.png');
	game.load.image('ball-beige', 'assets/img/ball-beige.png');
	game.load.image('ball-purple', 'assets/img/ball-purple.png');

    },

    create: function () {
	game.state.start('Menu');
    }
};
