var SplashPage = Backbone.View.extend({
    el: "#container",

    initialize:function(){
        this.template = _.template(tpl.get("splash"));
    },

    render:function(){
        $(this.el).html(this.template({}));
        return this;
    }
});