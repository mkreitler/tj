// Define namespace for engine components.

tj = {};

tj.assert = function(test, message) {
	if (!test) {
		console.log("ASSERTION FAILED: " + message);
		debugger;
	}
};

tj.Game = function(client, backColor, fr) {
	var frameDtMS = fr ? Math.round(1000 / fr) : Math.round(1000 / 30),
		clearColor = backColor ? backColor : null,
		delegate = client || this,
		bRunning = false,
		lastNow = 0,
		self = this,
		currentState = null;

	this.setState = function(newState) {
		if (newState != currentState) {
			if (currentState && currentState.exit) {
				currentState.exit();
			}
			
			if (newState && newState.enter) {
				newState.enter();
			}
			
			currentState = newState;
		}
	};
	
	this.start = function() {
		if (!bRunning) {
			console.log("--- Starting game!");
			bRunning = true;
			lastNow = Date.now();
			setTimeout(this.gameLoop, frameDtMS);
		}
	}
	
	this.gameLoop = function() {
		var gfx = tj.Graphics.lock(),
		then = Date.now();
		
		// Update delegate
		if (delegate && delegate.update) {
			delegate.update((then - lastNow) * 0.001);
		}
		
		if (currentState && currentState.update) {
			currentState.update((then - lastNow) * 0.001);
		}
		
		if (clearColor) {
			gfx.fillStyle = clearColor;
			gfx.fillRect(0, 0, tj.Graphics.width(), tj.Graphics.height());
		}

		// Draw delegate
		if (delegate && delegate.draw) {
			delegate.draw(gfx);
		}
		
		if (currentState && currentState.draw) {
			currentState.draw(gfx);
		}
		
		tj.Graphics.unlock();

		if (bRunning) {
			lastNow = Date.now();
			setTimeout(self.gameLoop, Math.max(frameDtMS, frameDtMS - (lastNow - then)));
		}
	};
	
	this.stop = function() {
		bRunning = false;
	};
	
	///////////////////////////////////////////////////////////////////////////
	// Resource Loading
	///////////////////////////////////////////////////////////////////////////
	this.loadImage = function(path) {
		return new tj.ImageEx(path, this.imageLoadSuccess, this.imageLoadFail, this);
	};
	
	this.imageLoadSuccess = function(img) {
		if (img && img.allLoaded()) {
			this.start();
		}
		else if (img) {
			tj.assert(!img.loadComplete(), "Failed to load all images!");
		}
	};
	
	this.imageLoadFail = function(img) {
		tj.assert(false, "Image load failed!");
	};
};
