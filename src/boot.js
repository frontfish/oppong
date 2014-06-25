Game = {};

A = {
    w: 600,
    h: 250,
    color: {
	purple: '#928897',
	beige:  '#e2e2cb',
    },
};

Math.rand = function (max) {
    return Math.floor(Math.random() * max);
};

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
    },

    create: function () {
	game.state.start('Load');
    }
};

