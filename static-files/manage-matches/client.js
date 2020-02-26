/* globals $ FormData */

function saveMatch(n) {
  disableRow(n);
  $.ajax({
    url: "/match/",
    type: "POST",
    data: {
      event_code: $("#eventBox").val(),
      match_num: n,
      match_type: $("#match" + n + "type").val(),
      red1: $("#match" + n + "red1").val(),
      red2: $("#match" + n + "red2").val(),
      red3: $("#match" + n + "red3").val(),
      blue1: $("#match" + n + "blue1").val(),
      blue2: $("#match" + n + "blue2").val(),
      blue3: $("#match" + n + "blue3").val()
    },
    success: data => {
      if (data.message === "success") {
        $("#match" + n + "button").removeClass("btn-success");
        $("#match" + n + "button").addClass("btn-outline-secondary");
        $("#match" + n + "button").attr("onClick", "editMatch(" + n + ")");
        $("#match" + n + "button").text("Edit");
        console.log(parseInt(n) + 1);
        $("#matchList").append(newMatchRow(parseInt(n) + 1));
      } else {
        console.log(data.message);
      }
    }
  });
  console.log(n);
}

function disableRow(n) {
  $("#match" + n + "type").attr("disabled", true);
  $("#match" + n + "red1").attr("readonly", true);
  $("#match" + n + "red2").attr("readonly", true);
  $("#match" + n + "red3").attr("readonly", true);
  $("#match" + n + "blue1").attr("readonly", true);
  $("#match" + n + "blue2").attr("readonly", true);
  $("#match" + n + "blue3").attr("readonly", true);
  $("#match" + n + "red1").addClass("font-weight-bold");
  $("#match" + n + "red2").addClass("font-weight-bold");
  $("#match" + n + "red3").addClass("font-weight-bold");
  $("#match" + n + "blue1").addClass("font-weight-bold");
  $("#match" + n + "blue2").addClass("font-weight-bold");
  $("#match" + n + "blue3").addClass("font-weight-bold");
}

function enableRow(n) {
  $("#match" + n + "type").attr("disabled", false);
  $("#match" + n + "red1").attr("readonly", false);
  $("#match" + n + "red2").attr("readonly", false);
  $("#match" + n + "red3").attr("readonly", false);
  $("#match" + n + "blue1").attr("readonly", false);
  $("#match" + n + "blue2").attr("readonly", false);
  $("#match" + n + "blue3").attr("readonly", false);
  $("#match" + n + "red1").removeClass("font-weight-bold");
  $("#match" + n + "red2").removeClass("font-weight-bold");
  $("#match" + n + "red3").removeClass("font-weight-bold");
  $("#match" + n + "blue1").removeClass("font-weight-bold");
  $("#match" + n + "blue2").removeClass("font-weight-bold");
  $("#match" + n + "blue3").removeClass("font-weight-bold");
}

function updateMatch(n) {
  disableRow(n);
  $.ajax({
    url: "/match-update/",
    type: "POST",
    data: {
      event_code: $("#eventBox").val(),
      match_num: n,
      match_type: $("#match" + n + "type").val(),
      red1: $("#match" + n + "red1").val(),
      red2: $("#match" + n + "red2").val(),
      red3: $("#match" + n + "red3").val(),
      blue1: $("#match" + n + "blue1").val(),
      blue2: $("#match" + n + "blue2").val(),
      blue3: $("#match" + n + "blue3").val()
    },
    success: data => {
      if (data.message === "success") {
        $("#match" + n + "button").removeClass("btn-success");
        $("#match" + n + "button").addClass("btn-outline-secondary");
        $("#match" + n + "button").attr("onClick", "editMatch(" + n + ")");
        $("#match" + n + "button").text("Edit");
      } else {
        console.log(data.message);
      }
    }
  });
  console.log(n);
}

function editMatch(n) {
  enableRow(n);
  $("#match" + n + "button").removeClass("btn-outline-secondary");
  $("#match" + n + "button").addClass("btn-success");
  $("#match" + n + "button").attr("onClick", "updateMatch(" + n + ")");
  $("#match" + n + "button").text("Save");
}

function newMatchRow(n) {
  return (
    '<div class="input-group mb-2">' +
    '<div class="input-group-prepend">' +
    '<span class="input-group-text input-group-bookend text-right">' +
    n +
    "</span>" +
    "</div>" +
    '<select class="custom-select" id="match' +
    n +
    'type">' +
    '<option value="1" selected>Qualifying</option>' +
    '<option value="2">Playoff</option>' +
    "</select>" +
    '<input type="text" id="match' +
    n +
    'red1" class="form-control border-danger" placeholder="Red Team 1" />' +
    '<input type="text" id="match' +
    n +
    'red2" class="form-control border-danger" placeholder="Red Team 2" />' +
    '<input type="text" id="match' +
    n +
    'red3" class="form-control border-danger" placeholder="Red Team 3" />' +
    '<input type="text" id="match' +
    n +
    'blue1" class="form-control border-primary" placeholder="Blue Team 1" />' +
    '<input type="text" id="match' +
    n +
    'blue2" class="form-control border-primary" placeholder="Blue Team 2" />' +
    '<input type="text" id="match' +
    n +
    'blue3" class="form-control border-primary" placeholder="Blue Team 3" />' +
    '<div class="input-group-append"><button id="match' +
    n +
    'button" class="btn btn-success input-group-bookend" type="button" onclick="saveMatch(' +
    n +
    ')">Save</button></div>' +
    "</div>"
  );
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
    $("#matchList").removeClass("invisible");
    $("#matchList").empty();
    $.ajax({
      url: "/match/" + $("#eventBox").val(),
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("You received some match data!", data);
        if (data.length > 0) {
          $.each(data, function(i, item) {
            $("#matchList").append(
              '<div class="input-group mb-2">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text input-group-bookend text-right">' +
                item.match_num +
                "</span>" +
                "</div>" +
                '<select class="custom-select" id="match' +
                item.match_num +
                'type">' +
                '<option value="1"' +
                (parseInt(item.match_type) === 1 ? " selected" : "") +
                ">Qualifying</option>" +
                '<option value="2"' +
                (parseInt(item.match_type) === 2 ? " selected" : "") +
                ">Playoff</option>" +
                "</select>" +
                '<input type="text" id="match' +
                item.match_num +
                'red1" class="form-control border-danger" placeholder="Red Team 1" value="' +
                item.red1 +
                '" />' +
                '<input type="text" id="match' +
                item.match_num +
                'red2" class="form-control border-danger" placeholder="Red Team 2" value="' +
                item.red2 +
                '" />' +
                '<input type="text" id="match' +
                item.match_num +
                'red3" class="form-control border-danger" placeholder="Red Team 3" value="' +
                item.red3 +
                '" />' +
                '<input type="text" id="match' +
                item.match_num +
                'blue1" class="form-control border-primary" placeholder="Blue Team 1" value="' +
                item.blue1 +
                '" />' +
                '<input type="text" id="match' +
                item.match_num +
                'blue2" class="form-control border-primary" placeholder="Blue Team 2" value="' +
                item.blue2 +
                '" />' +
                '<input type="text" id="match' +
                item.match_num +
                'blue3" class="form-control border-primary" placeholder="Blue Team 3" value="' +
                item.blue3 +
                '" />' +
                '<div class="input-group-append"><button id="match' +
                item.match_num +
                'button" class="btn btn-outline-secondary input-group-bookend" type="button" onclick="editMatch(' +
                item.match_num +
                ')">Edit</button></div>' +
                "</div>"
            );
            disableRow(item.match_num);
          });
        }
        $("#matchList").append(newMatchRow(data.length + 1));
      }
    });
  });

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $("#status").html("Error: unknown ajaxError!");
  });
});
