const vc = require('./index.js');
const { Client } = require("discord.js");
const client = new Client();
const vCodes = new vc("vCodes-Bot-Token-Here", client)

vCodes.on("ready", () => {
    console.log('vCodes ready!')
})

vCodes.checkVote("userId").then((value) => {
    if(value === 1) {
        console.log("User voted.")
    } else {
        console.log("User not voted.")
    }
})

vCodes.certificateApplication("Bla bla bla bla bla bla bla bla bla bla bla bla...", () => {
    console.log("Certificate successfully applied.");
})

client.on("ready", () => {
    console.log("Logged as in "+client.user.tag)
})

client.login("Discord-Bot-Token")