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

// Open forget-password modal
$(document).on("click", "#forget-password-link", function(e) {
  e.preventDefault();
  $("#login").foundation("close");
  if ($("#forget-password").length > 0) {
    clearAlertMessages();
    $("#forget-password").foundation("open");
  } else {
    $("#foundation-popup").load("welcome/forget_password #forget-password", function() {
      forget_password = new Foundation.Reveal($("#forget-password"));
      forget_password.open();
    })
  }
});

// Submit forget-password form through ajax.
$(document).on("submit", "#forget_password_form", function(e) {
  e.preventDefault();
  $("input[type=submit]").prop("disabled", true);
}).on("ajax:success", "#forget-password", function(e, data, status, xhr) {
  $("input[type=submit]").prop("disabled", false);
  console.log("status: " + status)
  $("#forget-password").foundation("close");
}).on("ajax:error", "#forget-password", function(e, data, status, xhr) {
  $("input[type=submit]").prop("disabled", false);

  $(".alert_info").empty().css({ "dispaly": "block", "background-color": "#F88E8B" });
  $(".alert_info").append("<p>" + data.responseJSON[0] + "</p>");
});

$(document).on("submit", "#reset_password_form", function(e) {

}).on("ajax:success", "#reset_password", function(e, data, status, xhr) {
  console.log(data)
  $(location).attr("href", data.url);
}).on("ajax:error", "#reset_password", function(e, data, status, xhr) {
  console.log(data)
  $(".alert_info").empty().css({ "dispaly": "block", "background-color": "#F88E8B" });
  $(".alert_info").append("<p>" + data.responseJSON[0] + "</p>");
});

function clearAlertMessages() {
  $(".alert_info").empty().css({ display: "none" });
}
