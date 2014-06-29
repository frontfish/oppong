Game = {};

A = {
    w: 600,
    h: 250,
    color: {
	purple: '#928897',
	beige:  '#e2e2cb',
    },
    text: {},
    audio: true,
};

Math.rand = function (max) {
    return Math.floor(Math.random() * max);
};

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
	game.load.image('background', 'assets/img/background.png');
	game.load.image('loading-frame', 'assets/img/loading-frame.png');
	game.load.image('loading-bar', 'assets/img/loading-bar.png');
    },

    create: function () {
	game.state.start('Load');
    }
};

