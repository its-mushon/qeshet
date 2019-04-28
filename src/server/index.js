const express = require('express');
const os = require('os');
const sheetsAuth = require('./sheetsAuth.js');
const { google } = require('googleapis');
const util = require('util');

const auth = sheetsAuth.authorize();

const app = express();

app.use(express.static('dist'));
app.get('/api/getRangedData', (req, res) => {
  let spreadsheetInfo = {
    spreadsheetId: '1YcrGijE2Om2czttHbYqQvoCD7Hh6phMdxvbLmBDlpCc',
    range: 'ranged'
  };

  const sheets = google.sheets({ version: 'v4', auth });
  const getValueFromSpreadSheet = util.promisify(
    sheets.spreadsheets.values.get
  );

  getValueFromSpreadSheet(spreadsheetInfo)
    .then(result => res.send(result.data.values))
    .catch(err => res.send('The API returned an error: ' + err));
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
