// Remove page from DOM when it's being replaced
$('div[data-role="page"]').on('pagehide', function (event, ui) {
    console.log('hiding a page');
    $(event.currentTarget).remove();
});

/// TEMPLATING ///
tpl = {

    // Hash of preloaded templates for the app
    templates: {},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates: function (names, callback) {
        var that = this;

        var loadTemplate = function (index) {
            var name = names[index];

            $.ajax({
                url: 'templates/' + name + '.html',
                data: {},
                success: function (data){
                    that.templates[name] = data;
                    index++;
                    if (index < names.length) {
                        loadTemplate(index);
                    } else {
                        callback();
                    }
                },
                error: function (msg) {
                },
                complete: function(msg) {
                },
                async: false
            });
        };

        loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        var temp = this.templates[name];
        return temp;
    }

};

// Initializing BackStack.StackNavigator for the #container div
var stackNavigator = new BackStack.StackNavigator({
    el: '#container'
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"index",
        "login":"login",
        "overview":"projectOverview"
    },

    initialize:function () {
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        var router = this; // Allows us to access "this" inside functions
        UsersDB.getMyUser({
            success: function(user) {
                router.user = user;
                router.navigate("overview", { trigger:true, replace:false });
            },
            error: function(user) {
                console.log('It did not find my-user');
                router.navigate("login", { trigger:true, replace:false });
            }
        });
    },

    index: function() {
        // TODO : Figure out if they are already logged in
        // TODO : If they are not logged in, display Login/Register page
        // TODO : Otherwise display Project Overview page
    },

    login: function() {
        stackNavigator.pushView(new LoginPage({ model: this.user }));
    },

    projectOverview: function() {
        stackNavigator.pushView(new OverviewPage({}));
        ProjectsDB.nuke();
        TestProjects.each(function(prj){
            var project = prj.toJSON();
            ProjectsDB.save({ key:project.name, data: project }, function(record){
                console.log('saved ' + record.key);
            });
        });
    }

});