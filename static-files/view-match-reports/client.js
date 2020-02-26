/* globals $ moment */

var table;

$(document).ready(() => {
  createViewIndi();

  $.ajax({
    url: "/match-report/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some match data!", data);
      var teams = [];
      $.each(data, function(i, item) {
        if (teams.indexOf(item.team_num) < 0) {
          teams.push(item.team_num);
        }
        var newRow =
          "<tr style='border-top: 2px solid black'><td>" +
          item.team_num +
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
          "</td><td>" +
          item.created_by +
          "</td></tr>";
        // if (item.notes.length > 0) {
        //   newRow +=
        //     "<tr style='border-bottom: 2px solid black'><td colspan=14>Notes: " +
        //     item.notes +
        //     "</td></tr>";
        // }
        $("#indiReportTable tbody").append(newRow);
      });
      table = $("#indiReportTable").DataTable({
        paging: false
      });

      // populate averages table
      $.each(teams, function(i, team) {
        const filtered = data.filter(t => t.team_num === team);
        const avgInnerAuto =
          filtered.reduce((total, next) => total + parseInt(next.inner_auto), 0) /
          filtered.length;
        console.log(team, avgInnerAuto);
      });
    }
  });
});

function createViewAvg() {
  console.log("CREATING AVG VIEW");
  $("#indiTableDiv").addClass("invisible");
  $("#avgTableDiv").removeClass("invisible");
}

function createViewIndi() {
  console.log("CREATING INDI VIEW");
  $("#indiTableDiv").removeClass("invisible");
  $("#avgTableDiv").addClass("invisible");
}

// define a generic Ajax error handler:
// http://api.jquery.com/ajaxerror/
$(document).ajaxError(() => {
  $("#status").html("Error: unknown ajaxError!");
});
