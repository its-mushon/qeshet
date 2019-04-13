const express = require('express');
const os = require('os');
const sheetsAuth = require('./sheetsAuth.js');
const { google } = require('googleapis');
const util = require('util');

// const app = express();

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username + sheetsResolver.returnData }));

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
// async function getCellRangeInSheet(auth, args) {
//   let result = await s
//   return result;
// }

// var args = new Object();
let args = {
  spreadsheetId: '1YcrGijE2Om2czttHbYqQvoCD7Hh6phMdxvbLmBDlpCc',
  range: 'ranged'
};

const auth = sheetsAuth.authorize();
const sheets = google.sheets({ version: 'v4', auth });
const getValueFromSpreadSheet = util.promisify(sheets.spreadsheets.values.get);

getValueFromSpreadSheet(args).then(result => console.log(result.data.values));
