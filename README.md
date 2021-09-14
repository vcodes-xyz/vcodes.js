# vcodes.js
<a href="https://discord.gg/8ZBYQAS4Q9" target="_blank"><img src="https://img.devsforum.net/tr/img/h1Z2X3.png" alt="Join our discord" width="256"></a><br>
**Support:** [https://discord.gg/8ZBYQAS4Q9](https://discord.gg/8ZBYQAS4Q9) <br>
**NPM:** [npmjs.com/package/vcodes.js](https://www.npmjs.com/package/vcodes.js)<br>

## Installation
*If you have trouble with the installation, please feel free to visit our [discord](https://discord.gg/8ZBYQAS4Q9) address.*
- `npm i vcodes.js`

# Define Module & Client
```js
const Discord = require("discord.js");
const client = new Discord.Client();
const vCodes = require("vcodes.js");
const dbl = new vCodes("TOKEN-HERE", client);

client.login("MTk4NjIyNDgzNDcxOTI1MjQ4.Cl2FMQ.ZnCjm1XVW7vRze4b7Cq4se7kKWs");
```

# Certificate Application
```js
dbl.certificateApplication("Bla bla bla bla bla bla bla bla bla bla bla bla...", () => {
    console.log("Certificate successfully applied.");
})
```

# Vote Checking
```js
dbl.checkVote("userId").then((value) => {
    if(value === 1) {
        console.log("User voted.")
    } else {
        console.log("User not voted.")
    }
})
```


# All Operations
```js
const vCodes = require('vcodes.js');
const { Client } = require("discord.js");
const client = new Client();
const dbl = new vCodes("vCodes-Bot-Token-Here", client)

dbl.on("ready", () => {
    console.log('vCodes ready!')
})

dbl.checkVote("userId").then((value) => {
    if(value === 1) {
        console.log("User voted.")
    } else {
        console.log("User not voted.")
    }
})

dbl.certificateApplication("Bla bla bla bla bla bla bla bla bla bla bla bla...", () => {
    console.log("Certificate successfully applied.");
})

client.on("ready", () => {
    console.log("Logged as in "+client.user.tag)
})

client.login("Discord-Bot-Token")
```

