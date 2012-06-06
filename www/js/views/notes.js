var NotesPage = Backbone.View.extend({
    el: "#container",

    initialize: function() {
        this.template = _.template(tpl.get("notes"));
    },

    render: function() {
        $(this.el).html(this.template({}));
        return this;
    }
});