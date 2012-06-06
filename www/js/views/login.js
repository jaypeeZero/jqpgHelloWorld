var LoginPage = Backbone.View.extend({
  el: $("#container"),

    initialize: function(){
      this.template = _.template(tpl.get("login"));
    },

    render: function(e){
      console.log("Rendering login view");
      $(this.el).html(this.template(this.model));
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