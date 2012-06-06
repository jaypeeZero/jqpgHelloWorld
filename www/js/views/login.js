var LoginPage = Backbone.View.extend({
    initialize: function(){
      this.template = _.template(tpl.get("login"));
    },

    render: function(e){
        console.log("rendering login page with the following user");
        console.log(this.model);
        $(this.el).html(this.template(this.model));
        this.mainView = new LoginView({ el: $("#loginpage", this.el), model: this.model });
        this.mainView.render();
        return this;
    }
});

var LoginView = Backbone.View.extend({

    initialize: function(){
    },

    render: function(e){
        console.log("rendering login view");
        return this;
    }
});

/*
$("#loginpage").live('pageinit', function (event, ui) {
  var confirmpassword = $('#confirm');
  confirmpassword.hide();
  $('input[id*=radio-choice]').click(function (e) {
    var confirmAction = (e.target.value == "login") ? function() { confirmpassword.hide(); } : function() { confirmpassword.show(); };
    confirmAction();

  });
  $('#submit').click(function(e){
    e.preventDefault();
    alert('test');
  });
});
*/