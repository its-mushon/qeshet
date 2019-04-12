const fs = require('fs');
const util = require('util');
const { google } = require('googleapis');
const TOKEN_PATH = 'token.json';
const readFile = util.promisify(fs.readFile);
const credentials = require(require('os').homedir() + '/credentials.js');

async function authorize() {
  console.log(credentials.value);
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.value.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  let token = await readFile(TOKEN_PATH);
  let parsed = JSON.parse(token);

  oAuth2Client.setCredentials(parsed);

  return oAuth2Client;
}

exports.authorize = authorize;
