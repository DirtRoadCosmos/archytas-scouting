/* globals $ FormData */

function toggleAttendance(n) {
  const button = "#button" + n;
  if ($(button).text() === "Not Attending") {
    $(button).text("...");
    $.ajax({
      url: "/event_team_add/",
      type: "POST",
      data: {
        event_code: $("#eventBox").val(),
        team_num: n
      },
      success: data => {
        if (data.message === "success") {
          $(button).text("Attending");
          $(button).removeClass("btn-secondary");
          $(button).addClass("btn-success");
        } else {
          console.log(data.message);
        }
      }
    });
  } else {
    $(button).text("...");
    $.ajax({
      url: "/event_team_delete/",
      type: "POST",
      data: {
        event_code: $("#eventBox").val(),
        team_num: n
      },
      success: data => {
        if (data.message === "success") {
          $(button).text("Not Attending");
          $(button).removeClass("btn-success");
          $(button).addClass("btn-secondary");
        } else {
          console.log(data.message);
        }
      }
    });
  }
  console.log(n);
}

$(document).ready(() => {
  $.ajax({
    url: "/event/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some event data!", data);
      $.each(data, function(i, item) {
        $("#eventBox").append(
          $("<option>", {
            value: item.blue_alliance_code,
            text: item.name
          })
        );
      });
    }
  });

  $("#eventBox").change(() => {
    $("#teamTable").empty();
    $.ajax({
      url: "/event_team/" + $("#eventBox").val(),
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("You received some event_team data!", data);
        $.each(data, function(i, item) {
          $("#teamTable").append(
            "<tr><td width='200px'><label id='button" +
              item.team_num +
              "' " +
              "class='btn btn-sm m-0 w-100 " +
              (item.event_code === $("#eventBox").val()
                ? "btn-success"
                : "btn-secondary") +
              "' onclick='toggleAttendance(" +
              item.team_num +
              ")'>" +
              (item.event_code === $("#eventBox").val()
                ? "Attending"
                : "Not Attending") +
              "</label></td><td class='align-middle'><strong>" +
              item.team_num +
              "</strong> " +
              item.team_name +
              "</td></tr>"
          );
        });
      }
    });
  });

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $("#status").html("Error: unknown ajaxError!");
  });
});
