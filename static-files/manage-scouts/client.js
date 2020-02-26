/* globals $ */

$(document).ready(() => {
  $("#allScoutsButton").click(() => {
    $.ajax({
      url: "/user/",
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("You received some data!", data);
        $("#status").html("All scouts: " + data);
      }
    });
  });

  $("#insertButton").click(() => {
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
      }
    });
  });

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $("#status").html("Error: unknown ajaxError!");
  });
});
