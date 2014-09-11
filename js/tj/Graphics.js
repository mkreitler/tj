tj.GraphicsClass = function() {
	var canvas = document.querySelector("canvas"),
	    context = canvas ? canvas.getContext('2d') : null,
	    width = canvas ? canvas.width : 0,
	    height = canvas ? canvas.height : 0,
	    refCount = 0;
	    
	this.lock = function() {
	  ++refCount;
	  if (context) {
		  context.save();
	  }
	  
	  return context;
	};
	
	this.unlock = function() {
		if (context) {
			context.restore();
		}
		
		--refCount;
	};
	
	this.width = function() {
		return width;
	};
	
	this.height = function() {
		return height;
	};

	this.defaultContext = function() {
		return context;
	};

  // In order for this to size correctly along the vertical, the strFont must have the
  // form "Npt fontName", where 'N' is a number, like 20.
  // Example: "20pt verdana".
	this.print = function(gfx, message, xAnchor, yAnchor, strColor, hAlign, vAlign, strFont) {
		var xCenter = hAlign || 0.5,
				yCenter = vAlign || 0.5,
				color = strColor || "white",
				font = strFont || "20pt verdana",
				textSize = null,
				x = 0,
				y = 0;

		if (gfx) {
			gfx.font = font;
			gfx.textAlign = 'left';
			gfx.textBaseline = 'top';
			gfx.fillStyle = color;
			textSize = gfx.measureText(message);

			x = xAnchor - textSize.width * xCenter;
			y = yAnchor - parseInt(font) * yCenter;

			gfx.fillText(message, x, y);
		}
	}
};

tj.Graphics = new tj.GraphicsClass();
