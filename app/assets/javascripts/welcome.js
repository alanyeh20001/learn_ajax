$(function() {
  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
});

// open foundation signup modal
$(function() {
  $("#foundation-popup-link").click(function(event) {
    event.preventDefault();
    if ($("#signup").length > 0) {
      $("#signup").foundation("open");
    } else {
      $("#foundation-popup").load("welcome/signup #signup", function() {
        signup = new Foundation.Reveal($("#signup"));
        signup.open();
      });
    }
  });
});

// Show signup error messages in popup modal
$(document).on("submit", "#registration_form", function(e) {
  $("input[type=submit]").prop("disabled", true);
  // can put some pre-check
}).on("ajax:success", "#registration_form", function(e, data, status, xhr) {
  $("input[type=submit]").prop("disabled", false);
  console.log("success")
  $("#signup").foundation("close");
  $("#foundation-popup").load("welcome/signup_confirm #signup-confirm", function() {
    signup_confirm = new Foundation.Reveal($("#signup-confirm"));
    signup_confirm.open();
  });
}).on("ajax:error", "#registration_form", function(e, data, status, xhr) {
  $("input[type=submit]").prop("disabled", false);
  $(".alert_info").empty();

  for (var key in data.responseJSON) {
    console.log(key, data.responseJSON[key])
    $(".alert_info").append("<p>"+data.responseJSON[key]+"</p>");
    $(".alert_info").css("background-color", "#F88E8B");
  }
});

// open foundation login modal
$(function() {
  $("#login-link").click(function(event) {
    event.preventDefault();
    if ($("#login").length > 0) {
      $("#login").foundation("open");
      if($("#forget-password-link").click) {
        console.log("first")
        openForgetPassword();
      }
    } else {
      $("#foundation-popup").load("welcome/login #login", function() {
        login = new Foundation.Reveal($("#login"));
        login.open();
      });
    }
  });
});

// submit login form through ajax
$(document).on("submit", "#login_form", function(e) {
  $("input[type=submit]").prop("disabled", true);
}).on("ajax:success", "#login_form", function(e, data, status, xhr) {
  $("input[type=submit]").prop("disabled", false);
  $("#login").foundation("close");
  location.reload();
}).on("ajax:error", "#login_form", function(e, data, status, xhr) {
  $("input[type=submit]").prop("disabled", false);
  $(".alert_info").empty();

  $(".alert_info").append("<p>" + data.responseText + "</p>");
  $(".alert_info").css("background-color", "#F88E8B");
});
