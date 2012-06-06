var SplashPage = Backbone.View.extend({
    el: "#container",

    initialize:function(){
        this.template = _.template(tpl.get("splash"));
        setTimeout(function(){
            UsersDB.getMyUser({
            success: function(user) {
                stackNavigator.pushView(new OverviewPage({}));
            },
            error: function(user) {
                console.log('It did not find my-user');
                stackNavigator.pushView(new LoginPage({}));
            }
        });
        }, 1000);
    },

    render:function(){
        $(this.el).html(this.template({}));
        return this;
    }
});