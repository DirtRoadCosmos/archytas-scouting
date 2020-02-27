 /* globals $ FormData */

$(document).ready(() => {
  // $("#matchBoxDiv").addClass("invisible");
  // $("#teamBoxDiv").addClass("invisible");
  // $("#fullFormDiv").addClass("invisible");
  $("#the-section-with-questions")
    .addClass("d-block")
    .removeClass("d-none");
  $("#the-section-after-pressing-submit")
    .addClass("d-none")
    .removeClass("d-block");
  let inner_high_auto_balls_count = 0;
  $("#inner_high_auto_button").click(function() {
    inner_high_auto_balls_count++;
    $("#inner_high_auto_balls").html(inner_high_auto_balls_count);
  });
  $("#inner_high_auto_minus_button").click(function() {
    inner_high_auto_balls_count--;
    $("#inner_high_auto_balls").html(inner_high_auto_balls_count);
  });
  let high_auto_balls_count = 0;
  $("#high_auto_button").click(function() {
    high_auto_balls_count++;
    $("#high_auto_balls").html(high_auto_balls_count);
  });
  $("#high_auto_minus_button").click(function() {
    high_auto_balls_count--;
    $("#high_auto_balls").html(high_auto_balls_count);
  });
  let low_auto_balls_count = 0;
  $("#low_auto_button").click(function() {
    low_auto_balls_count++;
    $("#low_auto_balls").html(low_auto_balls_count);
  });
  $("#low_auto_minus_button").click(function() {
    low_auto_balls_count--;
    $("#low_auto_balls").html(low_auto_balls_count);
  });
  let inner_high_balls_count = 0;
  $("#inner_high_button").click(function() {
    inner_high_balls_count++;
    $("#inner_high_balls").html(inner_high_balls_count);
  });
  $("#inner_high_minus_button").click(function() {
    inner_high_balls_count--;
    $("#inner_high_balls").html(inner_high_balls_count);
  });
  let high_balls_count = 0;
  $("#high_button").click(function() {
    high_balls_count++;
    $("#high_balls").html(high_balls_count);
  });
  $("#high_minus_button").click(function() {
    high_balls_count--;
    $("#high_balls").html(high_balls_count);
  });
  let low_balls_count = 0;
  $("#low_button").click(function() {
    low_balls_count++;
    $("#low_balls").html(low_balls_count);
  });
  $("#low_minus_button").click(function() {
    low_balls_count--;
    $("#low_balls").html(low_balls_count);
  });


  $.ajax({
    url: "/team/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some team data!", data);
      $("#teamBox").empty();
      $.each(data, function(i, item) {
        $("#teamBox").append(
          $("<option>", {
            value: item.num,
            text: item.num + ": " + item.name
          })
        );
      });
    }
  });
  
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
      $("#eventBox").val("2020nhgrs");
    }
  });

  $.ajax({
    url: "/user/",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("You received some user data!", data);
      $.each(data, function(i, item) {
        $("#nameBox").append(
          $("<option>", {
            value: item.num,
            text: item.name
          })
        );
      });
    }
  });

  $("#nameBox").change(e => {
    $.ajax({
      url: "/match/" + $("#eventBox").val(),
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("You received some match data!", data);
        $.each(data, function(i, item) {
          $("#matchBox").append(
            $("<option>", {
              value: item.match_num,
              text: item.match_num
            })
          );
        });
      }
    });
    $("#matchBoxDiv").removeClass("invisible");
  });

  $("#matchBox").change(e => {
    $("#matchBox").prop( "disabled", true );
    $.ajax({
      url:
        "/teams-for-match/" + $("#eventBox").val() + "/" + $("#matchBox").val(),
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("You received some teams-for-match data!", data);
        $("#teamBox option").each(function() {
          var teamWeMightRemove = parseInt($(this).val());
          if (teamWeMightRemove > 0 && !data.includes(teamWeMightRemove)) {
            $(this).remove();
          }
        });

        // now see whether there are any match teams that we don't have registered
        $("#teamBox option").each(function() {
          var teamWeMightRemove = parseInt($(this).val());
          var index = data.indexOf(teamWeMightRemove);
          if (index >= 0) {
            data.splice(index, 1);
          }
        });
        
        if (data.length > 0) {
          var teamList = "";
          $.each(data, function (i, item) {
            teamList += " " + item;
          })
          $("#teamsWarningSpan").html("These teams need to be added to our database: " + teamList);
          $("#teamsWarningSpan").removeClass("invisible");
        }
        
        // //$("#teamBox").empty();
        // $.each(data, function(i, item) {
        //   $("#teamBox option[value='" + item.num + "']").remove();
        //   // $("#teamBox").append(
        //   //   $("<option>", {
        //   //     value: item.num,
        //   //     text: item.num + ": " + item.name
        //   //   })
        //   // );
        // });
      }
    });
    $("#teamBoxDiv").removeClass("invisible");
  });

  $("#teamBox").change(e => {
    $("#fullFormDiv").removeClass("invisible");
  });

  $("#insertButton").click(e => {
    e.preventDefault();
    let controlPanelValue = 0;
    $('input[name="control_panel_checkbox"]:checked').each(function() {
      controlPanelValue += parseInt(this.value);
    });
    let endpositionValue = 0;
    $('input[name="endposition_checkbox"]:checked').each(function() {
      endpositionValue += parseInt(this.value);
    });
    let aggressionValue = 0;
    $('input[name="aggression_checkbox"]:checked').each(function() {
      aggressionValue += parseInt(this.value);
    });
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: "/match-report/",
      type: "POST", // <-- this is POST, not GET
      data: {
        match_num: $("#matchBox").val(),
        team_num: $("#teamBox").val(),
        starting_position: $('input[name="starting_radio"]:checked').val(),
        inner_auto: parseInt($("#inner_high_auto_balls").text()),
        high_auto: parseInt($("#high_auto_balls").text()),
        low_auto: parseInt($("#low_auto_balls").text()),
        inner: parseInt($("#inner_high_balls").text()),
        high: parseInt($("#high_balls").text()),
        low: parseInt($("#low_balls").text()),
        control_panel: controlPanelValue,
        end_position: endpositionValue,
        aggression: aggressionValue,
        trench: $('input[name="trench_radio"]:checked').val(),
        notes: $("#notesBox").val(),
        created_time: Date.now(),
        created_by: $("#nameBox").val()
      },
      success: data => {
        console.log(data.message);
        $("#the-section-with-questions")
          .addClass("d-none")
          .removeClass("d-block");
        $("#the-section-after-pressing-submit")
          .addClass("d-block")
          .removeClass("d-none");
        $("#after-title").html("You did it!");
        $("#after-status").html(data.message);
      }
    });
  });

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $("#status").html("Error: unknown ajaxError!");
  });
});
