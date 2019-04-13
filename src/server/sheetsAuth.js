const { google } = require('googleapis');
const credentials = require(require('os').homedir() + '/credentials.js');
const token = require(require('os').homedir() + '/token.json');

function authorize() {
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

  oAuth2Client.setCredentials(token);

  return oAuth2Client;
}

exports.authorize = authorize;
