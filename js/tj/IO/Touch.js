tj.TouchClass = function() {
   var canvas = document.querySelector("canvas"),
       self = this;

   /* touchstart event */
   canvas.addEventListener("touchstart", function(e) 
   {
      self.listeners.send("showMessage", "touch: touchStart");
   }, false);
    
   /* touchend event */
   canvas.addEventListener("touchend", function(e) 
   {
      self.listeners.send("showMessage", "touch: touchEnd");
   }, false);
    
   /* touchmove event */
   canvas.addEventListener("touchmove", function(e) 
   {
      self.listeners.send("showMessage", "touch: touchMove");
   }, false);
    
   /* touchcancel event */
   canvas.addEventListener("touchcancel", function(e) 
   {
      self.listeners.send("showMessage", "touch: touchCancel");
   }, false);
};

tj.TouchClass.prototype.listeners = new tj.ListenerClass();

tj.TouchClass.prototype.addListener = function(listener, message, fnCompare) {
   this.listeners.add(listener, message, fnCompare);
};

tj.Touch = new tj.TouchClass();

