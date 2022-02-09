const vCodes = require('./vcodes.index');
const dbl = new vCodes("BOT TOKEN");


dbl.on("ready", (bot) => {
    console.log(`Bot named ${bot.username} successfully finded on vCodes.`)
    dbl.checkVote("714451348212678658").then(value => console.log("Vote Control: "+ value))

    /*
        let guildCount = 1234;
        let shardCount = 5;
        dbl.stats(guildCount, shardCount, () => console.log("Stats updated on vCodes."));
    */
})


/*
    Get with Bot: 
    dbl.on("vote", ({ user, bot }) => {
        console.log(`${user.username} voted ${bot.username}`)
    })
*/
dbl.on("vote", ({ user }) => {
    console.log(`${user.username} voted.`)
})