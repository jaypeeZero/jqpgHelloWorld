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
            console.log("Loading " + name);

            $.ajax({
                url: 'templates/' + name + '.html',
                data: {},
                success: function (data){
                    console.log("success on loading " + name + " template.");
                    that.templates[name] = data;
                    index++;
                    if (index < names.length) {
                        loadTemplate(index);
                    } else {
                        callback();
                    }
                },
                error: function (msg) {
                    console.log(msg);
                },
                complete: function(msg) {
                    console.log(msg);
                },
                async: false
            });
        };

        loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        console.log('getting ' + name);
        var temp = this.templates[name];
        console.log('got it!');
        return temp;
    }

};

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
                router.navigate("login", { trigger:true, replace:false });
            },
            error: function(user) {
                console.log('It did not find my-user');
                router.navigate("login", { trigger:true, replace:false });
            }
        });
    },

    index: function() {
        console.log("Loading Index function");

        // TODO : Figure out if they are already logged in
        // TODO : If they are not logged in, display Login/Register page
        // TODO : Otherwise display Project Overview page
    },

    login: function() {
        console.log("Loading Login function");
        this.changePage(new LoginPage({ model: this.user }));
    },

    projectOverview: function() {
        ProjectsDB.nuke();
        TestProjects.each(function(prj){
            var project = prj.toJSON();
            ProjectsDB.save({ key:project.name, data: project }, function(record){
                console.log('saved ' + record.key);
            });
        });
    },

    changePage:function (page) {
        console.log('changing page');
        $(page.el).attr('data-role', 'page');
        $(page.el).attr('data-dom-cache', 'false');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});