
function decodeUnixTimestamp(t) {
  // return moment(t).format("D MMM YY, h:mm a");
  t = parseInt(t);
  return moment(t).fromNow();
}

function decodeBallAbility(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "None";
      break;
    case 1:
      output = "Low Goal";
      break;
    case 2:
      output = "High Goal";
      break;
    case 3:
      output = "Both";
      break;
  }
  return output;
}

function decodeAggression(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "No Defense Played";
      break;
    case 1:
      output = "Mild";
      break;
    case 2:
      output = "Moderate";
      break;
    case 3:
      output = "Mild to Moderate";
      break;
    case 4:
      output = "Severe";
      break;
    case 6:
      output = "Moderate to Severe";
      break;
    case 8:
      output = "Yellow Card";
      break;
    case 12:
      output = "Severe-Yellow Card";
      break;
    case 16:
      output = "Red Card";
      break;
    case 20:
      output = "Severe-Red Card";
      break;
    default:
      output = "Uncommon Scenario-Check Notes";
      break;
  }
  return output;
}

function decodeStartingPosition(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 1:
      output = "Driver Left";
      break;
    case 2:
      output = "Driver Center";
      break;
    case 4:
      output = "Driver Auto";
      break;
    case 8:
      output = "Opponent Left";
      break;
    case 16:
      output = "Opponent Center";
      break;
    case 32:
      output = "Opponent Right";
      break;
  }
  return output;
}

function decodeControlPanel(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "No Interaction";
      break;
    case 1:
      output = "Tri-Spin";
      break;
    case 2:
      output = "To-Color Spin";
      break;
    case 3:
      output = "Tri and To Color Spin";
      break;
  }
  return output;
}

function decodeEndPosition(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "Not in Recharge Zone";
      break;
    case 1:
      output = "Floor";
      break;
    case 2:
      output = "Level";
      break;
    case 3:
      output = "Level from Floor";
      break;
    case 4:
      output = "Climb";
      break;
    case 5:
      output = "Floor and CLimb(invalid)";
      break;
    case 6:
      output = "Level with Climb";
      break;
    case 7:
      output = "Floor Climb Level(invalid)";
      break;
  }
  return output;
}

function decodeShooterDistance(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "Unknown";
      break;
    case 1:
      output = "Close";
      break;
    case 2:
      output = "Medium";
      break;
    case 4:
      output = "Far";
      break;
  }
  return output;
}

function decodeTrench(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "Unknown";
      break;
    case 1:
      output = "No";
      break;
    case 2:
      output = "Yes";
      break;
  }
  return output;
}
function decodeColorWheel(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "Unknown";
      break;
    case 1:
      output = "No";
      break;
    case 2:
      output = "Yes";
      break;
  }
  return output;
}
function decodeDriveTrain(n) {
  n = parseInt(n);
  let output = "";
  switch (n) {
    case 0:
      output = "Unknown";
      break;
    case 1:
      output = "Regular";
      break;
    case 2:
      output = "Pneumatic";
      break;
    case 4:
      output = "Mecanum";
      break;
    case 8:
      output = "Omni";
      break;
  }
  return output;
}
