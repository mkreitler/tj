tj.MouseClass = function() {
   /* touchstart event */
   var self = this;

   window.addEventListener("mouseover", function(e) 
   {
      self.listeners.send("showMessage", "Mouse: mouseover");
   }, false);
    
   /* touchend event */
   window.addEventListener("mouseout", function(e) 
   {
      self.listeners.send("showMessage", "Mouse: mouseout");
   }, false);
    
   /* touchmove event */
   window.addEventListener("mousedown", function(e) 
   {
      self.listeners.send("showMessage", "Mouse: mousedown");
   }, false);
    
   /* touchcancel event */
   window.addEventListener("mouseup", function(e) 
   {
      self.listeners.send("showMessage", "Mouse: mouseup");
   }, false);
};

tj.MouseClass.prototype.listeners = new tj.ListenerClass();

tj.MouseClass.prototype.addListener = function(listener, message, fnCompare) {
   this.listeners.add(listener, message, fnCompare);
};

tj.Mouse = new tj.MouseClass();
