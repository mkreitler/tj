var CanvasTest = function() {
	var // Constants
		
		// Variables
		game = null,
		stateMainMap = null;

	// Initialization /////////////////////////////////////////////////////////
	game = new tj.Game(this);

	stateMainMap = new StateMainMap(game);
	game.setState(stateMainMap);
};
