var OverviewPage = Backbone.View.extend({
    el: "#container",

    initialize: function() {
        this.template = _.template(tpl.get("projectoverview"));

        // Get the default Project for this user
    },
    render: function() {
        $(this.el).html(this.template({}));
        return this;
    }
});