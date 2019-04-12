const express = require('express');
const os = require('os');
const sheetsAuth = require('./sheetsAuth.js');
const { google } = require('googleapis');

// const app = express();

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username + sheetsResolver.returnData }));

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function getCellRangeInSheet(auth, args) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get(args, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log(rows);
      return rows;
    } else {
      console.log('No data found.');
    }
  });
}

// var args = new Object();
args = {
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  range: 'Class Data!A2:E'
};

const ds = sheetsAuth.authorize();

ds.then(
  auth => getCellRangeInSheet(auth, args) // shows "done!" after 1 second
  // error => alert(error) // doesn't run
);
