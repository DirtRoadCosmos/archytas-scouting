/* globals $ moment */

$(document).ready(() => {
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  //   $.ajax({
  //     url: "/team/",
  //     type: "GET",
  //     dataType: "json",
  //     success: data => {
  //       console.log("You received some team data!", data);
  //       $.each(data, function(i, item) {
  //         var newRow =
  //           '<br><button class="btn btn-light btn-block text-left" type="button" data-toggle="collapse"' +
  //           ' data-target="#collapse' +
  //           item.num +
  //           '" aria-expanded="false">' +
  //           // '<span id="badge' +
  //           // item.num +
  //           // '"' +
  //           // 'class="badge badge-pill badge-danger">0</span>' +
  //           "<strong>" +
  //           item.num +
  //           "</strong> " +
  //           item.name +
  //           '</button><div class="collapse" id="collapse' +
  //           item.num +
  //           '"><div class="card card-body"><div class="container"><div class="row"><div class="col"><table id="matchTable' +
  //           item.num +
  //           '" class="table table-bordered"><thead class="thead-light"><tr>' +
  //           // "<th>When</th>" +
  //           // "<th>Scout</th>" +
  //           // "<th>Match</th>" +
  //           // "<th>Starting Position</th>" +
  //           // "<th>Inner High Auto</th>" +
  //           // "<th>High Auto</th>" +
  //           // "<th>Low Auto</th>" +
  //           // "<th>Inner High Port</th>" +
  //           // "<th>High Port</th>" +
  //           // "<th>Low Port</th>" +
  //           // "<th>Trench</th>" +
  //           "<th>Control Panel</th>" +
  //           "<th>Endgame</th>" +
  //           "</tr></thead><tbody></tbody></table>" +
  //           "</div><div class='col'>" +
  //           '<table id="pitTable' +
  //           item.num +
  //           '" class="table table-bordered"><thead class="thead-light"><tr>' +
  //           "<th>When</th>" +
  //           // "<th>Scout</th>" +
  //           // "<th>Weight</th>" +
  //           // "<th>Trench</th>" +
  //           // "<th>Ball Ability</th>" +
  //           "<th>Shooter Distance</th>" +
  //           "</tr></thead><tbody></tbody></table>" +
  //           "</div></div></div>" +
  //           "</div></div>";

  //         $("#teamList").append(newRow);
  //       });

  //       $.ajax({
  //         url: "/match-report/",
  //         type: "GET",
  //         dataType: "json",
  //         success: data => {
  //           console.log("You received some match data!", data);
  //           $.each(data, function(i, item) {
  //             var newRow =
  //               "<tr style='border-top: 2px solid black'><td>" +
  //               decodeUnixTimestamp(item.created_time) +
  //               "</td><td>" +
  //               item.created_by +
  //               "</td><td>" +
  //               item.match_num +
  //               "</td><td>" +
  //               decodeStartingPosition(item.trench) +
  //               "</td><td>" +
  //               item.high_hole +
  //               "</td><td>" +
  //               item.high_port +
  //               "</td><td>" +
  //               item.low_hole +
  //               "</td><td>" +
  //               decodeTrench(item.trench) +
  //               "</td><td>" +
  //               decodeControlPanel(item.control_panel) +
  //               "</td><td>" +
  //               decodeEndgame(item.endgame) +
  //               "</td></tr>";
  //             if (item.notes.length > 0) {
  //               newRow +=
  //                 "<tr style='border-bottom: 2px solid black'><td colspan=10>Notes: " +
  //                 item.notes +
  //                 "</td></tr>";
  //             }
  //             $("#matchTable" + item.team_num + " tbody").append(newRow);
  //             $("#badge" + item.team_num).html(
  //               parseInt($("#badge" + item.team_num).html()) + 1
  //             );
  //           });
  //         }
  //       });

  $.ajax({
    url: "/team/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some team data!", data);
      $.each(data, function(i, item) {
        var newRow =
          '<br><button class="btn btn-light btn-block text-left" type="button" data-toggle="collapse"' +
          ' data-target="#collapse' +
          item.num +
          '" aria-expanded="false">' +
          // '<span id="badge' +
          // item.num +
          // '"' +
          // 'class="badge badge-pill badge-danger">0</span>' +
          "<strong>" +
          item.num +
          "</strong> " +
          item.name +
          '</button><div class="collapse" id="collapse' +
          item.num +
          '"><div class="card card-body">' +
          '<table id="pitTable' +
          item.num +
          '" class="table table-bordered"><thead class="thead-light"><tr>' +
          "<th>Pit Report</th>" +
          "<th>Scout</th>" +
          "<th>Weight</th>" +
          "<th>Trench</th>" +
          "<th>Ball Ability</th>" +
          "<th>Shooter Distance</th>" +
          "<th>Drive Train</th>" +
          "<th>Color Wheel</th>" +
          "</tr></thead><tbody></tbody></table>" +
          '<table id="matchTable' +
          item.num +
          '" class="table table-bordered"><thead class="thead-light"><tr>' +
          "<th>Match Report</th>" +
          "<th>Scout</th>" +
          "<th>Match</th>" +
          "<th>Starting Position</th>" +
          "<th>Inner High Auto</th>" +
          "<th>High Auto</th>" +
          "<th>Low Auto</th>" +
          "<th>Inner High Port</th>" +
          "<th>High Port</th>" +
          "<th>Low Port</th>" +
          "<th>Trench</th>" +
          "<th>Control Panel</th>" +
          "<th>Aggression</th>" +
          "<th>End Position</th>" +
          "</tr></thead><tbody></tbody></table>" +
          "</div></div>";

        $("#teamList").append(newRow);
      });

      $.ajax({
        url: "/match-report/",
        type: "GET",
        dataType: "json",
        success: data => {
          console.log("You received some match data!", data);
          $.each(data, function(i, item) {
            var newRow =
              "<tr style='border-top: 2px solid black'><td>" +
              decodeUnixTimestamp(item.created_time) +
              "</td><td>" +
              item.created_by +
              "</td><td>" +
              item.match_num +
              "</td><td>" +
              decodeStartingPosition(item.starting_position) +
              "</td><td>" +
              item.inner_auto +
              "</td><td>" +
              item.high_auto +
              "</td><td>" +
              item.low_auto +
              "</td><td>" +
              item.inner +
              "</td><td>" +
              item.high +
              "</td><td>" +
              item.low +
              "</td><td>" +
              decodeTrench(item.trench) +
              "</td><td>" +
              decodeControlPanel(item.control_panel) +
              "</td><td>" +
              decodeAggression(item.aggression) +
              "</td><td>" +
              decodeEndPosition(item.end_position) +
              "</td></tr>";
            if (item.notes.length > 0) {
              newRow +=
                "<tr style='border-bottom: 2px solid black'><td colspan=14>Notes: " +
                item.notes +
                "</td></tr>";
            }
            $("#matchTable" + item.team_num + " tbody").append(newRow);
            $("#badge" + item.team_num).html(
              parseInt($("#badge" + item.team_num).html()) + 1
            );
          });
        }
      });

      $.ajax({
        url: "/pit-report/",
        type: "GET",
        dataType: "json",
        success: data => {
          console.log("You received some pit data!", data);
          $.each(data, function(i, item) {
            var newRow =
              "<tr style='border-top: 2px solid black'><td>" +
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
            if (item.notes.length > 0) {
              newRow +=
                "<tr style='border-bottom: 2px solid black'><td colspan=6>Notes: " +
                item.notes +
                "</td></tr>";
            }
            $("#pitTable" + item.num + " tbody").append(newRow);
            $("#badge" + item.num).html(
              parseInt($("#badge" + item.num).html()) + 1
            );
          });
        }
      });
    }
  });
});

// define a generic Ajax error handler:
// http://api.jquery.com/ajaxerror/
$(document).ajaxError(() => {
  $("#status").html("Error: unknown ajaxError!");
});
