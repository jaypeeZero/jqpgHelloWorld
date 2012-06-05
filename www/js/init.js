// This file must be places physically higher in the html tags than jquery mobile
$(document).on("mobileinit", function(){
    console.log('mobileinit');

    // Make sure that jQuery Mobile doesn't handle Routing
    // It will be handled by Backbone.js instead
    $.mobile.page.prototype.options.domCache = false;
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

// Remove page from DOM when it's being replaced
$('div[data-role="page"]').on('pagehide', function (event, ui) {
    console.log('hiding a page');
    $(event.currentTarget).remove();
});