Game.Menu = function (game) { };

Game.Menu.prototype = {
    create: function () {
	A.background = game.add.sprite(-380, 0, 'background');
	A.title = game.add.sprite(5, 5, 'title');
    },

    update: function () {
	// upon some input:
	game.state.start('Play');
    }
};
