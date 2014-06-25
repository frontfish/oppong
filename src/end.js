Game.End = function (game) { };

Game.End.prototype = {
    create: function () {

    },

    update: function () {
	game.state.start('Menu');
    }
};
