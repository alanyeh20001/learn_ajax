$(function () {
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

// Show signup error messages in popup modal
$(document).on("submit", "#registration_form", function(e) {

}).on("ajax:success", "#registration_form", function(e, data, status, xhr) {
  console.log("success: #{data}")
}).on("ajax:error", "#registration_form", function(e, data, status, xhr) {
  $(".alert_info").empty();

  for (var key in data.responseJSON) {
    console.log(key, data.responseJSON[key])
    $(".alert_info").append("<p>"+key+" "+data.responseJSON[key][0]+"</p>");
    $(".alert_info").css("background-color", "#F88E8B");
  }
});
