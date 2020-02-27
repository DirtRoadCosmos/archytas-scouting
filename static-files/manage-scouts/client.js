/* globals $ */

$(document).ready(() => {
  loadScoutList();

  $("#insertButton").click(() => {
    $("#status").html("");
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: "/user/",
      type: "POST", // <-- this is POST, not GET
      data: {
        name: $("#scout-name").val()
      },
      success: data => {
        $("#status").html(data.message);
        $("#scout-name").val("");
        loadScoutList();
      }
    });
  });

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $("#status").html("Error: unknown ajaxError!");
  });
});

function loadScoutList() {
  $.ajax({
    url: "/user/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some data!", data);
      $("#scoutDiv").html("");
      $.each(data, function(i, scout) {
        var scoutData = " - " + scout.name + "<br>";
        $("#scoutDiv").append(scoutData);
      });
      console.log(JSON.stringify(data))
    }
  });
}
