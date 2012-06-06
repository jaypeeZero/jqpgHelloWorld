var Project = Backbone.Model.extend({
    defautls: {},
    initialize: function() {

    }
});

var Projects = Backbone.Collection.extend({
    model: Project
});

// TESTING //
var TestProjects = new Projects([
    { name: "Test 1", thing: "testing" },
    { name: "Test 2", thing: "still testing" },
    { name: "Test 3", thing: "always testing!" }
]);
// END TESTING //

var ProjectsDB = Lawnchair({ name:"projects" }, function(store){
    console.log("Opened projects db");

    this.before('save', function(record){
    });

    this.after('save', function(record){
    });
});