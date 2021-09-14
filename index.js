const fetch = require("node-fetch");
const { apiPath, prefix, errorColor, defaultColor } = require("./_config.js");


function sendErrorWithConsole(message, exit) {
  if(exit && exit !== false) {
    console.log(errorColor, prefix+message, defaultColor);
    return process.exit();
  } else {
    return console.log(errorColor, prefix+message, defaultColor);
  }
}
async function checkToken(token) {
  let request = await fetch(apiPath+'/api/checkToken', { 
    body: JSON.stringify({ token: token }),
    headers: { 'Content-Type': 'application/json' },
    method: "POST"
  }).then(res => res.json());
  if(request.error) {
    return sendErrorWithConsole(request.error, true);
  }
}

module.exports = class vCodes {
  constructor(token, client) {
    if(!token) return sendErrorWithConsole("You must enter a token.", true);
    if(!client) return sendErrorWithConsole("You must enter a client.", true);
    checkToken(token)
    this["token"] = token;
    this["client"] = client;
    this._events = {};
    return this;
  }
  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    if (name !== "ready") return sendErrorWithConsole("You entered invalid listener name.", true);
    this._events[name].push(listener);
    listener();
  }

  async certificateApplication(description, listener) {
    if (description.length < 25) return sendErrorWithConsole("Your description too short you can write minimum 25 characters.", true);
    let request = await fetch(apiPath+'/api/certificateApplication', { 
      body: JSON.stringify({ description: description }),
      headers: { 'Authorization': this.token, 'Content-Type': 'application/json' },
      method: "POST"
    }).then(res => res.json());
    if(request.error) {
      return sendErrorWithConsole(request.error, true);
    } else {
      if(request.success) {
        return listener();
      } else {
        return sendErrorWithConsole(request.error, true);
      }
    }
  }

  async checkVote(id) {
    if (isNaN(id)) {
      sendErrorWithConsole("You entered invalid id because ids only number.", false)
      return new Promise((resolve, reject) => {
        resolve(0);
      });
    }
    let request = await fetch(apiPath+'/api/checkVote/'+id, { 
      headers: { 'Authorization': this.token },
      method: "POST"
    }).then(res => res.json());
    if(request.error) {
      sendErrorWithConsole(request.error, false)
      return new Promise((resolve, reject) => {
        resolve(0);
      });
    } else {
      if(request.voted) {
        return new Promise((resolve, reject) => {
          resolve(1);
        });
      } else {
        return new Promise((resolve, reject) => {
          resolve(0);
        });
      }
    }
  }

};
