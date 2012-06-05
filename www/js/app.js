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
                async: false
            });
            /*var data = $("#" + name + "template").html();
            that.templates[name] = data;
            index++;
            if (index < names.length) {
                loadTemplate(index);
            } else {
                callback();
            }*/
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

var dataStore = new Lawnchair({ name: 'users' }, function(store){
    console.log("Lawnchair opened");

    this.before('save', function(record){
        console.log("About to save this record");
        console.log(record);
    });

    this.after('save', function(record){
        console.log("Just saved this record");
        console.log(record);
    });

});

var user = new User();
user.email = "jamesw@gmail.com";

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"index",
        "login":"login"
    },

    initialize:function () {
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        this.user = user;
    },

    index: function() {
        var localUser = this.user;
        console.log("Loading Index function");

        // TODO : Figure out if they are already logged in
        dataStore.get('my-user', function(user){
            if (user && user.user) {
                console.log("Found my user!");
                console.log(user);
            } else {
                console.log("No User found, creating new one");
                dataStore.save({ key:"my-user", user:{ email: localUser.email } }, function(record){
                    console.log("Completed save of");
                    console.log(record);
                });
            }
        });
        // TODO : If they are not logged in, display Login/Register page
        // TODO : Otherwise display Project Overview page
    },

    login: function() {
        console.log("Loading Login function");
        this.changePage(new LoginPage({ model: this.user }));
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