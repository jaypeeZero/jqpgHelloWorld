function onBodyLoad() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady(); //this is a desktop browser
  }
}

var onDeviceReady = function() {
  tpl.loadTemplates(['login', 'projectoverview', 'splash'],
    function () {
      stackNavigator.pushView(SplashPage);
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