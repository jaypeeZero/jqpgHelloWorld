function onBodyLoad() {
  console.log("Loading Body");
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady(); //this is the browser
  }
}

var onDeviceReady = function() {
  console.log("Device is Ready");
  tpl.loadTemplates(['login'],
    function () {
      console.log("Running App Router");
      app = new AppRouter();

      // Use a Try/Catch because there is no way to check
      // if Backbone.history is already started.
      try {
        Backbone.history.start();
      } catch (err) {}
    });
};

$(document).ready(function(){
  // Runs before "onDeviceReady"
});