var User = Backbone.Model.extend({
    defaults: {},
    initialize: function() {

    }
});

var Users = Backbone.Collection.extend({
    model: User
});