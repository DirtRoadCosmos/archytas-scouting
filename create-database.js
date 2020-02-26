// Node.js + Express server backend
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the scouting.db
//   node create_database.js

// to clear the database, simply delete the scouting.db file:
//   rm scouting.db

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./.data/scouting.db");

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE team (num INTEGER, name TEXT)");

  console.log("successfully created the team table in scouting.db");

  // print them out to confirm their contents:
  db.each("SELECT * FROM team", (err, row) => {
    if (err) {
      console.error(err);
    } else {
      console.log(row.num + ": " + row.name);
    }
  });

  db.run("CREATE TABLE user (name TEXT)");
  console.log("successfully created the user table in scouting.db");

  db.run("INSERT INTO user VALUES ('Danny')");
  db.run("INSERT INTO user VALUES ('Paige')");
  db.run("INSERT INTO user VALUES ('Karen')");
  db.run("INSERT INTO user VALUES ('Andy')");

  // print them out to confirm their contents:
  db.each("SELECT * FROM user", (err, row) => {
    if (err) {
      console.error(err);
    } else {
      console.log(row.name);
    }
  });

  // create a new database table:
  db.run("CREATE TABLE pit_report (num INTEGER, weight INTEGER, trench INTEGER, ball_ability INTEGER, notes TEXT)");
  console.log("successfully created the pit_report table in scouting.db");

  // CREATE TABLE match_report (match_num INTEGER, team_num INTEGER, created_time INTEGER, created_by TEXT,
  // starting_position INTEGER, high_hole INTEGER, high_port INTEGER, low_hole INTEGER, trench INTEGER,
  // control_panel INTEGER, endgame INTEGER, notes TEXT)
  // print them out to confirm their contents:
  db.each("SELECT * FROM pit_report", (err, row) => {
    if (err) {
      console.error(err);
    } else {
      console.log(row.num + " (" + row.weight + "lbs): " + row.notes);
    }
  });
  /*
  CREATE TABLE match_report (match_num, team_num, starting_position, inner_auto, high_auto, low_auto, inner, high, low, aggression, control_panel, end_position, trench, notes, created_time, created_by)
*/
});

db.close();
