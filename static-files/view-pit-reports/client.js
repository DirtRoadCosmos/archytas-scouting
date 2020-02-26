/* globals $ moment */

$(document).ready(() => {
  $.ajax({
    url: "/pit-report/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some pit data!", data);
      $.each(data, function(i, item) {
        var newRow =
          "<tr><td>" +
          item.num +
          "</td><td>" +
          decodeUnixTimestamp(item.created_time) +
          "</td><td>" +
          item.created_by +
          "</td><td>" +
          item.weight +
          "</td><td>" +
          decodeTrench(item.trench) +
          "</td><td>" +
          decodeBallAbility(item.ball_ability) +
          "</td><td>" +
          decodeShooterDistance(item.shooter_distance) +
          "</td><td>" +
          decodeDriveTrain(item.drive_train) +
          "</td><td>" +
          decodeColorWheel(item.color_wheel) +
          "</td></tr>";
        // if (item.notes.length > 0) {
        //   newRow +=
        //     "<tr style='border-bottom: 2px solid black'><td colspan=6>Notes: " +
        //     item.notes +
        //     "</td></tr>";
        // }
        $("#reportTable tbody").append(newRow);
      });
      $("#reportTable").DataTable({
        paging: false
      });
    }
  });
});

// define a generic Ajax error handler:
// http://api.jquery.com/ajaxerror/
$(document).ajaxError(() => {
  $("#status").html("Error: unknown ajaxError!");
});
