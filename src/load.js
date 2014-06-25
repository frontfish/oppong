Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen


	// load everything


    },

    create: function () {
	game.state.start('Menu');
    }
};
