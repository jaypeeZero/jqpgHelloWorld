var User = Backbone.Model.extend({
    defaults: {},
    initialize: function() {

    }
});

// TESTING //
var TestUser = new User();
TestUser.email = "jamesw@gmail.com";
// END TESTING //

var Users = Backbone.Collection.extend({
    model: User
});

var UsersDB = Lawnchair({ name: "users" }, function(store){
    this.before('save', function(record){
    });

    this.after('save', function(record){
    });
});

// TODO : Change this to use Backbone.js functionality to grab information from the server
UsersDB.getMyUser = function(args){
    this.get('my-user', function(user){
        if (user && user.data) {
            if (args.success) {
                args.success(user);
            }
        } else {
            if (args.error) {
                // TODO : Do not automatically create a user like this
                console.log("No User found, creating new one");
                UsersDB.save({ key:"my-user", data: { email: TestUser.email } }, function(record){
                    // This runs when "save" is complete
                });

                args.error(user);
            }
        }
    });
};