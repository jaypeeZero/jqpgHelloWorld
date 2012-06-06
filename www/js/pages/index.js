function onBodyLoad() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady(); //this is a desktop browser
  }
}

var onDeviceReady = function() {
  tpl.loadTemplates(['login', 'projectoverview', 'splash', 'notes'],
    function () {
      stackNavigator.pushView(SplashPage);
    });
};

$(document).ready(function(){
  // Runs before "onDeviceReady"
});