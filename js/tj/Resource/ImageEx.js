tj.ImageEx = function(path, onLoadedCallback, onErrorCallback, observer) {
	var image = new Image();
	
	this.load(image, path, onLoadedCallback, onErrorCallback, observer);
	return image;
};

tj.ImageEx.prototype.pending = 0;
tj.ImageEx.prototype.nFailed = 0;

tj.ImageEx.prototype.allLoaded = function() {
	return this.pending === 0 && this.nFailed === 0;
};

tj.ImageEx.prototype.loadComplete = function() {
	return this.pending === 0;
};

tj.ImageEx.prototype.load = function(image, path, onLoadedCallback, onErrorCallback, observer) {
	var imgEx = this;
	
	++this.pending;
	image.src = path;
	
	if (observer) {
		image.onload = function() {
			--imgEx.pending;
			if (onLoadedCallback) {
				onLoadedCallback.call(observer, imgEx);
			}
		};
		
		image.onerror = function() {
			--imgEx.pending;
			++imgEx.nFailed;
			
			if (onErrorCallback) {
				onErrorCallback.call(observer, imgEx);
			}
		}
	}
};